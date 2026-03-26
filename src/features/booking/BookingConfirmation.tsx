/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Service } from '../../types';

interface BookingConfirmationProps {
  service: Service;
  date: Date;
  time: string;
  clientInfo: { name: string; phone: string };
  onClientInfoChange: (info: { name: string; phone: string }) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export function BookingConfirmation({
  service,
  date,
  time,
  clientInfo,
  onClientInfoChange,
  onConfirm,
  onBack
}: BookingConfirmationProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-md mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
          <ChevronLeft />
        </button>
        <h3 className="text-2xl font-serif">Confirma tus Datos</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
          <p className="text-sm text-gray-400">Resumen de reserva:</p>
          <p className="font-bold text-lg text-gold">{service.name}</p>
          <p className="flex items-center gap-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-gold" />
            {format(date, "EEEE d 'de' MMMM", { locale: es })}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gold" />
            {time} hrs
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nombre Completo</label>
            <input 
              type="text" 
              value={clientInfo.name}
              onChange={(e) => onClientInfoChange({...clientInfo, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
              placeholder="Ej: María González"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Teléfono de Contacto</label>
            <input 
              type="tel" 
              value={clientInfo.phone}
              onChange={(e) => onClientInfoChange({...clientInfo, phone: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none transition-colors"
              placeholder="Ej: +56 9 1234 5678"
            />
          </div>
        </div>

        <button 
          onClick={onConfirm}
          disabled={!clientInfo.name || !clientInfo.phone}
          className="w-full py-4 gold-gradient text-black font-bold rounded-xl disabled:opacity-50"
        >
          Confirmar Reserva
        </button>
      </div>
    </motion.div>
  );
}
