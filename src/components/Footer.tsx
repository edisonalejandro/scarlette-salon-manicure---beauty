/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Instagram, MapPin, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      {/* Llamado final */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 border-b border-cream/15 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <h2 className="text-5xl sm:text-6xl leading-[0.95] lg:whitespace-nowrap">
          Tus manos merecen <em className="italic text-sun whitespace-nowrap">lo mejor</em>
        </h2>
        <a
          href="#booking"
          className="inline-flex items-center justify-center rounded-full bg-sun text-ink px-8 py-4 text-sm font-semibold tracking-wide hover:bg-butter transition-colors"
        >
          Reservar hora
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/images/brand/logo-abs-160.png"
              alt="ABS Scarlette Salon"
              width={64}
              height={64}
              loading="lazy"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-serif text-2xl tracking-[0.18em]">SCARLETTE</p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.45em] text-sun mt-1">Manicure &amp; Beauty</p>
            </div>
          </div>
          <p className="text-cream/60 text-sm mt-6 max-w-xs leading-relaxed">
            Dedicados a resaltar tu belleza natural con los mejores productos y técnicas del mercado.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-cream/50 mb-6">Contacto</h4>
          <ul className="space-y-4 text-cream/85 text-sm">
            <li>
              <a href="tel:+56935004914" className="flex items-center gap-3 hover:text-sun transition-colors">
                <Phone className="w-4 h-4" strokeWidth={1.5} /> +56 9 3500 4914
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/scarlette.abs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-sun transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} /> @scarlette.abs
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/56935004914"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-sun transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> Escríbenos por WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4" strokeWidth={1.5} /> Providencia, Santiago · y a domicilio
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-cream/50 mb-6">Horarios</h4>
          <ul className="space-y-3 text-cream/85 text-sm max-w-xs">
            <li className="flex justify-between border-b border-cream/10 pb-3"><span>Lunes – Viernes</span> <span>09:00 – 19:00</span></li>
            <li className="flex justify-between border-b border-cream/10 pb-3"><span>Sábado</span> <span>10:00 – 16:00</span></li>
            <li className="flex justify-between"><span>Domingo</span> <span className="text-cream/50">Cerrado</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8 border-t border-cream/10 text-cream/40 text-xs">
        © 2026 Scarlette Salon. Todos los derechos reservados.
      </div>
    </footer>
  );
}
