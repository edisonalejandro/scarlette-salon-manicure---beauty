/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../../lib/utils';

interface BookingStepsProps {
  currentStep: number;
}

const steps = ['Servicio', 'Fecha y hora', 'Tus datos'];

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <ol className="grid grid-cols-3 gap-3 mb-12">
      {steps.map((label, i) => {
        const step = i + 1;
        const active = currentStep >= step;
        return (
          <li key={label} className="flex flex-col gap-3">
            <div className={cn('h-0.5 rounded-full transition-colors duration-500', active ? 'bg-sun' : 'bg-line')} />
            <div className="flex items-baseline gap-2">
              <span className={cn('font-serif text-lg', active ? 'text-ink' : 'text-muted/60')}>
                0{step}
              </span>
              <span
                className={cn(
                  'hidden sm:inline text-[11px] font-semibold uppercase tracking-[0.2em]',
                  active ? 'text-ink' : 'text-muted/60'
                )}
              >
                {label}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
