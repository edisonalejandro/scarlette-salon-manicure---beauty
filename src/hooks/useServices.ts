import { useState, useEffect, useCallback } from 'react';
import { Service } from '../types';
import { getAllServices, createService, updateService, deleteService } from '../services/servicesService';

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar servicios'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const addService = async (service: Omit<Service, 'id'>) => {
    await createService(service);
    await fetchServices();
  };

  const editService = async (id: string, service: Omit<Service, 'id'>) => {
    await updateService(id, service);
    await fetchServices();
  };

  const removeService = async (id: string) => {
    await deleteService(id);
    await fetchServices();
  };

  return { services, loading, error, addService, editService, removeService, refetch: fetchServices };
}
