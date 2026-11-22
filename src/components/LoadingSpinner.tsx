/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-cream">
      <img src="/images/brand/logo-abs-160.png" alt="ABS Scarlette Salon" width={96} height={96} className="w-24 h-24 rounded-full animate-pulse" />
      <div className="w-24 h-px bg-line overflow-hidden">
        <div className="h-full w-1/2 bg-sun animate-pulse" />
      </div>
    </div>
  );
}
