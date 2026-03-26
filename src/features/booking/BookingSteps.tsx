/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { cn } from '../../lib/utils';

interface BookingStepsProps {
  currentStep: number;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex justify-between mb-12 relative">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
      {[1, 2, 3].map((step) => (
        <div 
          key={step}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center z-10 font-bold transition-colors",
            currentStep >= step ? "gold-gradient text-black" : "bg-soft-black border border-white/20 text-gray-500"
          )}
        >
          {step}
        </div>
      ))}
    </div>
  );
}
