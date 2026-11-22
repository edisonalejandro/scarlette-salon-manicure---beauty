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
      <div className="w-20 h-20 bg-butter rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 className="w-9 h-9 text-honey" strokeWidth={1.5} />
      </div>
      <h3 className="text-4xl text-ink mb-4">¡Reserva <em className="mark">exitosa</em>!</h3>
      <p className="text-muted mb-10 max-w-sm mx-auto">
        Hemos recibido tu solicitud. Te contactaremos pronto para confirmar tu cita.
      </p>
      <button 
        onClick={onReset}
        className="btn-ghost"
      >
        Hacer otra reserva
      </button>
    </motion.div>
  );
}
