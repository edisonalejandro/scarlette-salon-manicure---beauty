/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-cream">
      <p className="font-serif text-3xl tracking-[0.18em] text-ink">SCARLETTE</p>
      <div className="w-24 h-px bg-line overflow-hidden">
        <div className="h-full w-1/2 bg-sun animate-pulse" />
      </div>
    </div>
  );
}
