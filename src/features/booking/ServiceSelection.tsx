/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import { Service } from '../../types';
import { cn } from '../../lib/utils';

interface ServiceSelectionProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

export function ServiceSelection({ services, onSelect }: ServiceSelectionProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
      <h3 className="text-2xl font-serif mb-6 text-center">¿Qué servicio buscas?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.length > 0 ? services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className="p-6 text-left rounded-xl border border-white/10 bg-white/5 transition-all hover:border-gold group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-xl font-bold group-hover:text-gold">{service.name}</h4>
              <span className="text-gold font-bold">${service.price.toLocaleString('es-CL')}</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">{service.description}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{service.duration} min</span>
            </div>
          </button>
        )) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            Cargando servicios...
          </div>
        )}
      </div>
    </motion.div>
  );
}
