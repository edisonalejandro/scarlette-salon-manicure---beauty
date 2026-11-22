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
        <button onClick={onBack} aria-label="Volver" className="p-2 -ml-2 hover:bg-sand rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h3 className="text-3xl text-ink">Confirma tus datos</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-butter/50 p-5 rounded-2xl border border-sun/40 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-honey">Resumen de reserva</p>
          <p className="font-serif text-2xl text-ink">{service.name}</p>
          <p className="flex items-center gap-2 text-sm text-ink capitalize">
            <CalendarIcon className="w-4 h-4 text-honey" strokeWidth={1.75} />
            {format(date, "EEEE d 'de' MMMM", { locale: es })}
          </p>
          <p className="flex items-center gap-2 text-sm text-ink">
            <Clock className="w-4 h-4 text-honey" strokeWidth={1.75} />
            {time} hrs
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Nombre Completo</label>
            <input 
              type="text" 
              value={clientInfo.name}
              onChange={(e) => onClientInfoChange({...clientInfo, name: e.target.value})}
              className="field"
              placeholder="Ej: María González"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Teléfono de Contacto</label>
            <input 
              type="tel" 
              value={clientInfo.phone}
              onChange={(e) => onClientInfoChange({...clientInfo, phone: e.target.value})}
              className="field"
              placeholder="Ej: +56 9 1234 5678"
            />
          </div>
        </div>

        <button 
          onClick={onConfirm}
          disabled={!clientInfo.name || !clientInfo.phone}
          className="btn-primary w-full"
        >
          Confirmar Reserva
        </button>
      </div>
    </motion.div>
  );
}
