/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Clock } from 'lucide-react';
import { format, addDays, startOfToday, isBefore, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../../lib/utils';

interface DateTimeSelectionProps {
  selectedDate: Date;
  selectedTime: string | null;
  onDateChange: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export function DateTimeSelection({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeSelect,
  onConfirm,
  onBack
}: DateTimeSelectionProps) {
  const availableTimes = ['09:00', '10:30', '12:00', '14:30', '16:00', '17:30'];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
          <ChevronLeft />
        </button>
        <h3 className="text-2xl font-serif">Selecciona Fecha y Hora</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Calendar */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="capitalize font-bold">{format(selectedDate, 'MMMM yyyy', { locale: es })}</span>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => <span key={d} className="text-xs text-gray-500">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 14 }).map((_, i) => {
              const day = addDays(startOfToday(), i);
              const isSelected = isSameDay(day, selectedDate);
              const isPast = isBefore(day, startOfToday());
              return (
                <button
                  key={i}
                  disabled={isPast}
                  onClick={() => onDateChange(day)}
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
            {availableTimes.map(time => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
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
            onClick={onConfirm}
            className="w-full mt-8 py-4 gold-gradient text-black font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
