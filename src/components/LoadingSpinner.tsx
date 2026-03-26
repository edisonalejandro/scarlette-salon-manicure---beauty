/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
