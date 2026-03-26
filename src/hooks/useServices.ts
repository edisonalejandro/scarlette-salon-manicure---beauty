/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Service } from '../types';
import * as servicesService from '../services/servicesService';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Subscribe to services changes
    const unsubscribe = servicesService.subscribeToServices((updatedServices) => {
      setServices(updatedServices);
      setLoading(false);
    });

    // Seed initial data if needed
    servicesService.seedInitialServices().catch((err) => {
      console.error('Error seeding services:', err);
      setError(err);
    });

    return unsubscribe;
  }, []);

  return {
    services,
    loading,
    error
  };
}
