/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/56935004914?text=' +
  encodeURIComponent('¡Hola Scarlett! Quiero agendar una hora 💅');

/** Se muestra mientras las reservas online no están disponibles. */
export function BookingComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center py-6 sm:py-10"
    >
      <div className="w-20 h-20 bg-butter rounded-full flex items-center justify-center mx-auto mb-8">
        <Sparkles className="w-9 h-9 text-honey" strokeWidth={1.5} />
      </div>
      <h3 className="text-4xl sm:text-5xl text-ink">
        Reservas online <em className="mark">muy pronto</em>
      </h3>
      <p className="mt-5 text-muted max-w-md mx-auto leading-relaxed">
        Estamos preparando todo para que puedas agendar desde aquí.
        Mientras tanto, escríbenos por WhatsApp y te reservamos tu hora.
      </p>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary mt-10"
      >
        <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
        Agendar por WhatsApp
      </a>
      <p className="mt-5 text-xs text-muted">+56 9 3500 4914</p>
    </motion.div>
  );
}
