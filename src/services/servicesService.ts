import { apiClient } from '../lib/apiClient';
import { Service } from '../types';

export async function getAllServices(): Promise<Service[]> {
  return apiClient.get<Service[]>('/api/services');
}

export async function createService(service: Omit<Service, 'id'>): Promise<Service> {
  return apiClient.post<Service>('/api/services', service);
}

export async function updateService(id: string, service: Omit<Service, 'id'>): Promise<Service> {
  return apiClient.put<Service>(`/api/services/${id}`, service);
}

export async function deleteService(id: string): Promise<void> {
  return apiClient.delete<void>(`/api/services/${id}`);
}
