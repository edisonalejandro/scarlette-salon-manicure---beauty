/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Menu, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  user: User | null;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function Navbar({ user, isAdmin, onLogin, onLogout }: NavbarProps) {
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
}
