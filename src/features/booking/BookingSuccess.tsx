/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface BookingSuccessProps {
  onReset: () => void;
}

export function BookingSuccess({ onReset }: BookingSuccessProps) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <div className="w-20 h-20 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-12 h-12 text-black" />
      </div>
      <h3 className="text-3xl font-serif mb-4">¡Reserva Exitosa!</h3>
      <p className="text-gray-400 mb-8 max-w-sm mx-auto">
        Hemos recibido tu solicitud. Te contactaremos pronto para confirmar tu cita.
      </p>
      <button 
        onClick={onReset}
        className="px-8 py-3 border border-gold text-gold font-bold rounded-full hover:bg-gold/10 transition-colors"
      >
        Volver al Inicio
      </button>
    </motion.div>
  );
}
