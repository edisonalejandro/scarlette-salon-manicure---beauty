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
      <h3 className="text-3xl mb-8 text-ink">¿Qué servicio buscas?</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.length > 0 ? services.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className="p-6 text-left rounded-2xl border border-line bg-cream/60 transition-all duration-300 hover:border-sun hover:bg-butter/40 hover:-translate-y-0.5 group"
          >
            <div className="flex justify-between items-start gap-4 mb-2">
              <h4 className="text-2xl text-ink">{service.name}</h4>
              <span className="text-ink font-semibold whitespace-nowrap">${service.price.toLocaleString('es-CL')}</span>
            </div>
            <p className="text-sm text-muted mb-5">{service.description}</p>
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>{service.duration} min</span>
            </div>
          </button>
        )) : (
          <div className="col-span-full text-center py-10 text-muted">
            Cargando servicios...
          </div>
        )}
      </div>
    </motion.div>
  );
}
