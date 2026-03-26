/**
 * Scarlette Salon – Manicure & Beauty
 * Main JavaScript
 */

(function () {
  'use strict';

  /* =======================================
     HEADER – scroll effect & active link
     ======================================= */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function onScroll() {
    // Scrolled class
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      }
    });

    // Back-to-top visibility
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* =======================================
     HAMBURGER / MOBILE NAV
     ======================================= */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* =======================================
     BACK TO TOP
     ======================================= */
  const backToTop = document.getElementById('backToTop');

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =======================================
     GALLERY FILTER
     ======================================= */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');

      // Filter items
      galleryItems.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* =======================================
     BOOKING FORM VALIDATION
     ======================================= */
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const newBookingBtn = document.getElementById('newBookingBtn');
  const submitBtn = document.getElementById('submitBtn');

  // Set minimum date to today
  const fechaInput = document.getElementById('fecha');
  if (fechaInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    fechaInput.setAttribute('min', `${yyyy}-${mm}-${dd}`);
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (error) error.textContent = message;
  }

  function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('error');
    if (error) error.textContent = '';
  }

  function validateForm() {
    let valid = true;

    // Nombre
    const nombre = document.getElementById('nombre');
    clearError('nombre');
    if (!nombre || nombre.value.trim().length < 2) {
      showError('nombre', 'Por favor ingresa tu nombre completo.');
      valid = false;
    }

    // Teléfono
    const telefono = document.getElementById('telefono');
    clearError('telefono');
    if (!telefono || telefono.value.trim().length < 7) {
      showError('telefono', 'Por favor ingresa un número de teléfono válido.');
      valid = false;
    }

    // Servicio
    const servicio = document.getElementById('servicio');
    clearError('servicio');
    if (!servicio || servicio.value === '') {
      showError('servicio', 'Por favor selecciona un servicio.');
      valid = false;
    }

    // Fecha
    const fecha = document.getElementById('fecha');
    clearError('fecha');
    if (!fecha || fecha.value === '') {
      showError('fecha', 'Por favor selecciona una fecha.');
      valid = false;
    }

    // Hora
    const hora = document.getElementById('hora');
    clearError('hora');
    if (!hora || hora.value === '') {
      showError('hora', 'Por favor selecciona una hora.');
      valid = false;
    }

    return valid;
  }

  // Live validation on blur
  ['nombre', 'telefono', 'servicio', 'fecha', 'hora'].forEach((id) => {
    const field = document.getElementById(id);
    if (field) {
      field.addEventListener('blur', () => {
        validateForm();
      });
      field.addEventListener('input', () => {
        clearError(id);
      });
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!validateForm()) return;

      const nombre = document.getElementById('nombre').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const servicio = document.getElementById('servicio');
      const servicioText = servicio.options[servicio.selectedIndex].text;
      const fecha = document.getElementById('fecha').value;
      const hora = document.getElementById('hora');
      const horaText = hora.options[hora.selectedIndex].text;
      const mensaje = document.getElementById('mensaje').value.trim();

      // Build WhatsApp message
      const waMessage = encodeURIComponent(
        `¡Hola Scarlette Salon! 💅\n\n` +
        `Me gustaría reservar una cita:\n` +
        `👤 Nombre: ${nombre}\n` +
        `✂️ Servicio: ${servicioText}\n` +
        `📅 Fecha: ${formatDate(fecha)}\n` +
        `🕐 Hora: ${horaText}\n` +
        (mensaje ? `📝 Mensaje: ${mensaje}\n` : '') +
        `\n¡Gracias!`
      );

      // Change button state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Abriendo WhatsApp...';

      // Open WhatsApp
      const waNumber = '573000000000'; // Replace with real number
      const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');

        // Show success
        bookingForm.hidden = true;
        bookingSuccess.hidden = false;

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Solicitar Cita por WhatsApp';
      }, 500);
    });
  }

  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
      bookingForm.hidden = false;
      bookingSuccess.hidden = true;
      bookingForm.reset();
      ['nombre', 'telefono', 'servicio', 'fecha', 'hora'].forEach(clearError);
    });
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${parseInt(day, 10)} de ${months[parseInt(month, 10) - 1]} de ${year}`;
  }

  /* =======================================
     INTERSECTION OBSERVER – entrance animations
     ======================================= */
  const animateEls = document.querySelectorAll(
    '.service-card, .gallery-item, .pricing-card, .testimonial-card, .about-grid, .contact-grid'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animateEls.forEach((el) => {
      el.classList.add('animate-ready');
      observer.observe(el);
    });
  }

  /* =======================================
     SMOOTH SCROLL for all anchor links
     ======================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Run scroll handler once on load
  onScroll();
})();
