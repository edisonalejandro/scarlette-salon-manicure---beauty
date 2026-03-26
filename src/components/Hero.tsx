/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export function Hero() {
  return (
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
  );
}
