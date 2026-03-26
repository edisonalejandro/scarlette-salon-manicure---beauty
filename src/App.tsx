/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  doc,
  setDoc,
  getDoc,
  Timestamp
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { 
  format, 
  addDays, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameDay, 
  isToday, 
  startOfToday,
  parseISO,
  isBefore
} from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Instagram, 
  Phone, 
  MapPin, 
  LogOut, 
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Plus,
  Trash2,
  Image as ImageIcon,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from './firebase';
import { cn } from './lib/utils';
import { Service, Appointment, GalleryItem, UserProfile } from './types';

// --- Error Handling ---
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// --- Components ---

const Navbar = ({ user, isAdmin, onLogin, onLogout }: { 
  user: User | null, 
  isAdmin: boolean, 
  onLogin: () => void, 
  onLogout: () => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center font-serif font-bold text-black text-xl">
              S
            </div>
            <span className="font-serif text-xl gold-text font-bold tracking-wider">SCARLETTE SALON</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="hover:text-gold transition-colors">Inicio</a>
            <a href="#gallery" className="hover:text-gold transition-colors">Trabajos</a>
            <a href="#booking" className="hover:text-gold transition-colors">Reservar</a>
            {isAdmin && <a href="#admin" className="text-gold font-bold">Admin</a>}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-400">{user.displayName}</span>
                <button onClick={onLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={onLogin}
                className="px-6 py-2 gold-gradient text-black font-bold rounded-full hover:scale-105 transition-transform"
              >
                Ingresar
              </button>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-soft-black border-b border-white/10 px-4 py-6 flex flex-col gap-4"
          >
            <a href="#home" onClick={() => setIsOpen(false)}>Inicio</a>
            <a href="#gallery" onClick={() => setIsOpen(false)}>Trabajos</a>
            <a href="#booking" onClick={() => setIsOpen(false)}>Reservar</a>
            {user ? (
              <button onClick={onLogout} className="text-left text-red-400">Cerrar Sesión</button>
            ) : (
              <button onClick={onLogin} className="text-left text-gold">Ingresar</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking State
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '' });
  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        } else {
          // Create client profile
          await setDoc(doc(db, 'users', u.uid), {
            email: u.email,
            name: u.displayName,
            role: 'client'
          });
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const qServices = query(collection(db, 'services'));
    const unsubServices = onSnapshot(qServices, (snap) => {
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
    });

    const qGallery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubGallery = onSnapshot(qGallery, (snap) => {
      setGallery(snap.docs.map(d => ({ id: d.id, ...d.data() } as GalleryItem)));
    });

    // Seed initial data if empty
    const seedData = async () => {
      const servicesSnap = await getDocs(collection(db, 'services'));
      if (servicesSnap.empty) {
        const initialServices = [
          { name: 'Manicura Rusa', price: 15000, duration: 60, description: 'Limpieza profunda de cutículas y esmaltado permanente.' },
          { name: 'Soft Gel', price: 25000, duration: 90, description: 'Extensiones de uñas con sistema soft gel para un acabado natural.' },
          { name: 'Esmaltado Permanente', price: 12000, duration: 45, description: 'Esmaltado de larga duración con diseño simple.' },
          { name: 'Retiro + Nutrición', price: 8000, duration: 30, description: 'Retiro seguro de producto y tratamiento fortalecedor.' }
        ];
        for (const s of initialServices) {
          await addDoc(collection(db, 'services'), s);
        }
      }

      const gallerySnap = await getDocs(collection(db, 'gallery'));
      if (gallerySnap.empty) {
        const initialGallery = [
          { imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800', title: 'Diseño Minimalista', description: 'Tonos nude con detalles en oro.', createdAt: Timestamp.now() },
          { imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', title: 'Rojo Clásico', description: 'Esmaltado permanente impecable.', createdAt: Timestamp.now() },
          { imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800', title: 'Soft Gel Art', description: 'Extensiones con diseño a mano alzada.', createdAt: Timestamp.now() }
        ];
        for (const g of initialGallery) {
          await addDoc(collection(db, 'gallery'), g);
        }
      }
    };
    seedData();

    return () => {
      unsubServices();
      unsubGallery();
    };
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const qApps = query(collection(db, 'appointments'), orderBy('date', 'desc'));
      return onSnapshot(qApps, (snap) => {
        setAppointments(snap.docs.map(d => ({ id: d.id, ...d.data() } as Appointment)));
      });
    }
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleBooking = async () => {
    if (!selectedService || !selectedTime) return;

    const path = 'appointments';
    try {
      await addDoc(collection(db, path), {
        userId: user?.uid || null,
        serviceId: selectedService.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        status: 'pending',
        clientName: clientInfo.name,
        clientPhone: clientInfo.phone,
        createdAt: Timestamp.now()
      });
      setBookingStep(4); // Success step
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar user={user} isAdmin={isAdmin} onLogin={handleLogin} onLogout={handleLogout} />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-40"
            alt="Nails Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-block"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gold p-2 mx-auto relative overflow-hidden group">
              <div className="absolute inset-0 gold-gradient opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center flex-col border border-gold/50">
                <span className="font-serif text-6xl md:text-8xl gold-text font-bold">ABS</span>
                <span className="font-serif text-sm md:text-lg text-gold tracking-[0.3em] mt-[-10px]">SCARLETTE SALON</span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-serif mb-6 leading-tight"
          >
            Realza tu belleza con <span className="gold-text italic">estilo y elegancia</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            Especialista en manicura, pedicura y cuidado personal. Reserva tu hora online y vive la experiencia Scarlette Salon.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#booking" className="px-10 py-4 gold-gradient text-black font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-lg shadow-gold/20">
              Reservar Ahora
            </a>
            <a href="#gallery" className="px-10 py-4 border border-gold text-gold font-bold rounded-full text-lg hover:bg-gold/10 transition-colors">
              Ver Trabajos
            </a>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Nuestros Trabajos</h2>
          <div className="w-24 h-1 gold-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.length > 0 ? gallery.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl glass-card"
            >
              <img 
                src={item.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={item.title || "Trabajo de manicura"}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <h3 className="text-xl font-serif text-gold">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          )) : (
            // Fallback items if gallery is empty
            [1,2,3,4,5,6].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-white/10" />
              </div>
            ))
          )}
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-24 bg-soft-black relative">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Reserva tu Hora</h2>
            <p className="text-gray-400">Selecciona el servicio y la fecha que más te acomode.</p>
          </div>

          <div className="glass-card p-6 md:p-10">
            {/* Steps Indicator */}
            <div className="flex justify-between mb-12 relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
              {[1, 2, 3].map((step) => (
                <div 
                  key={step}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-colors",
                    bookingStep >= step ? "gold-gradient text-black" : "bg-soft-black border border-white/20 text-gray-500"
                  )}
                >
                  {step}
                </div>
              ))}
            </div>

            {/* Step 1: Service Selection */}
            {bookingStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-2xl font-serif mb-6 text-center">¿Qué servicio buscas?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.length > 0 ? services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setBookingStep(2);
                      }}
                      className={cn(
                        "p-6 text-left rounded-xl border transition-all hover:border-gold group",
                        selectedService?.id === service.id ? "border-gold bg-gold/5" : "border-white/10 bg-white/5"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-bold group-hover:text-gold">{service.name}</h4>
                        <span className="text-gold font-bold">${service.price.toLocaleString('es-CL')}</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{service.duration} min</span>
                      </div>
                    </button>
                  )) : (
                    <div className="col-span-full text-center py-10 text-gray-500">
                      Cargando servicios...
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Date & Time */}
            {bookingStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setBookingStep(1)} className="p-2 hover:bg-white/10 rounded-full">
                    <ChevronLeft />
                  </button>
                  <h3 className="text-2xl font-serif">Selecciona Fecha y Hora</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Calendar */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="capitalize font-bold">{format(selectedDate, 'MMMM yyyy', { locale: es })}</span>
                      <div className="flex gap-2">
                        <button onClick={() => setSelectedDate(addDays(selectedDate, -7))} className="p-1 hover:bg-white/10 rounded"><ChevronLeft className="w-5 h-5"/></button>
                        <button onClick={() => setSelectedDate(addDays(selectedDate, 7))} className="p-1 hover:bg-white/10 rounded"><ChevronRight className="w-5 h-5"/></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                      {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <span key={d} className="text-xs text-gray-500">{d}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {/* Simple 2-week view for brevity */}
                      {Array.from({ length: 14 }).map((_, i) => {
                        const day = addDays(startOfToday(), i);
                        const isSelected = isSameDay(day, selectedDate);
                        const isPast = isBefore(day, startOfToday());
                        return (
                          <button
                            key={i}
                            disabled={isPast}
                            onClick={() => setSelectedDate(day)}
                            className={cn(
                              "aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all",
                              isSelected ? "gold-gradient text-black font-bold" : "hover:bg-white/10",
                              isPast ? "opacity-20 cursor-not-allowed" : ""
                            )}
                          >
                            <span>{format(day, 'd')}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h4 className="font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      Horas disponibles para el {format(selectedDate, "d 'de' MMMM", { locale: es })}
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'].map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-3 rounded-lg border text-sm font-bold transition-all",
                            selectedTime === time ? "border-gold bg-gold/10 text-gold" : "border-white/10 hover:border-gold/50"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <button 
                      disabled={!selectedTime}
                      onClick={() => setBookingStep(3)}
                      className="w-full mt-8 py-4 gold-gradient text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {bookingStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <button onClick={() => setBookingStep(2)} className="p-2 hover:bg-white/10 rounded-full">
                    <ChevronLeft />
                  </button>
                  <h3 className="text-2xl font-serif">Confirma tus Datos</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
                    <p className="text-sm text-gray-400">Resumen de reserva:</p>
                    <p className="font-bold text-lg text-gold">{selectedService?.name}</p>
                    <p className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-gold" />
                      {format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gold" />
                      {selectedTime} hrs
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Nombre Completo</label>
                      <input 
                        type="text" 
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="Ej: María González"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Teléfono de Contacto</label>
                      <input 
                        type="tel" 
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="Ej: +56 9 1234 5678"
                      />
                    </div>
                  </div>

                  <button 
                    onClick={handleBooking}
                    disabled={!clientInfo.name || !clientInfo.phone}
                    className="w-full py-4 gold-gradient text-black font-bold rounded-xl disabled:opacity-50"
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Success */}
            {bookingStep === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-12 h-12 text-black" />
                </div>
                <h3 className="text-3xl font-serif mb-4">¡Reserva Exitosa!</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  Hemos recibido tu solicitud. Te contactaremos pronto para confirmar tu cita.
                </p>
                <button 
                  onClick={() => {
                    setBookingStep(1);
                    setSelectedService(null);
                    setSelectedTime(null);
                  }}
                  className="px-8 py-3 border border-gold text-gold font-bold rounded-full hover:bg-gold/10 transition-colors"
                >
                  Volver al Inicio
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Admin Section (Only visible to admin) */}
      {isAdmin && (
        <section id="admin" className="py-24 px-4 max-w-7xl mx-auto border-t border-white/10">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-serif gold-text">Panel de Administración</h2>
            <div className="flex gap-4">
              {/* Add Service/Gallery Button could go here */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Appointments List */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-gold" />
                Próximas Citas
              </h3>
              <div className="space-y-4">
                {appointments.length > 0 ? appointments.map(app => (
                  <div key={app.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                    <div>
                      <p className="font-bold">{app.clientName}</p>
                      <p className="text-xs text-gray-400">{app.clientPhone}</p>
                      <p className="text-sm text-gold mt-1">
                        {app.date} @ {app.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={cn(
                        "text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold",
                        app.status === 'confirmed' ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      )}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                )) : <p className="text-gray-500 text-center py-10">No hay citas registradas.</p>}
              </div>
            </div>

            {/* Quick Stats or Management */}
            <div className="space-y-8">
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold mb-6">Gestión de Servicios</h3>
                <div className="space-y-2">
                  {services.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span>{s.name}</span>
                      <span className="text-gold font-bold">${s.price}</span>
                    </div>
                  ))}
                  <button className="w-full mt-4 py-2 border border-dashed border-white/20 rounded-lg text-gray-500 hover:text-gold hover:border-gold transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Agregar Servicio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-6">
              <div className="w-8 h-8 rounded-full gold-gradient flex items-center justify-center font-serif font-bold text-black">S</div>
              <span className="font-serif text-lg gold-text font-bold tracking-wider">SCARLETTE SALON</span>
            </div>
            <p className="text-gray-500 text-sm">
              Dedicados a resaltar tu belleza natural con los mejores productos y técnicas del mercado.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-gold">Contacto</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone className="w-4 h-4 text-gold" /> +56 9 3500 4914
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Instagram className="w-4 h-4 text-gold" /> @scarlette.abs
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-gold" /> Santiago, Chile
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6 text-gold">Horarios</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex justify-between"><span>Lunes - Viernes</span> <span>09:00 - 19:00</span></li>
              <li className="flex justify-between"><span>Sábado</span> <span>10:00 - 16:00</span></li>
              <li className="flex justify-between"><span>Domingo</span> <span>Cerrado</span></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-20 text-gray-600 text-xs">
          © 2026 Scarlette Salon. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
