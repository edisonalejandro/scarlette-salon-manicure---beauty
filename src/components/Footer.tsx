/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Instagram, MapPin } from 'lucide-react';

export function Footer() {
  return (
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
  );
}
