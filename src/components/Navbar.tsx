/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { asset } from '../lib/asset';

interface NavbarProps {
  user: User | null;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const links = [
  { href: '#home', label: 'Inicio' },
  { href: '#gallery', label: 'Trabajos' },
  { href: '#booking', label: 'Reservar' },
];

export function Navbar({ user, isAdmin, onLogin, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled || isOpen
          ? 'bg-cream/85 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex justify-between h-20 items-center">
          <a href="#home" className="flex items-center gap-3">
            <img
              src={asset('/images/brand/logo-abs-160.png')}
              alt="ABS Scarlette Salon"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full shadow-md shadow-honey/20"
            />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-2xl tracking-[0.18em] text-ink">SCARLETTE</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.45em] text-rose-deep mt-1">
                Manicure &amp; Beauty
              </span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm font-medium text-ink/80 hover:text-ink transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-sun after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
            {isAdmin && (
              <a href="#admin" className="text-sm font-semibold text-rose-deep">
                Admin
              </a>
            )}

            {user ? (
              <div className="flex items-center gap-3 pl-6 border-l border-line">
                <span className="text-sm text-muted">{user.displayName}</span>
                <button
                  onClick={onLogout}
                  aria-label="Cerrar sesión"
                  className="p-2 rounded-full hover:bg-sand transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button onClick={onLogin} className="btn-ghost px-6 py-2.5">
                Ingresar
              </button>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-2"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-cream border-b border-line"
          >
            <div className="px-5 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-3xl text-ink"
                >
                  {l.label}
                </a>
              ))}
              {isAdmin && (
                <a href="#admin" onClick={() => setIsOpen(false)} className="font-serif text-3xl text-rose-deep">
                  Admin
                </a>
              )}
              <div className="pt-4 border-t border-line">
                {user ? (
                  <button onClick={onLogout} className="text-sm font-semibold text-rose-deep">
                    Cerrar sesión
                  </button>
                ) : (
                  <button onClick={onLogin} className="text-sm font-semibold text-ink">
                    Ingresar
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
