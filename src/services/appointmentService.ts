import { apiClient } from '../lib/apiClient';
import { Appointment } from '../types';

export interface CreateAppointmentData {
  userId: string | null;
  serviceId: string;
  date: string; // formato: yyyy-MM-dd
  time: string; // formato: HH:mm
  clientName: string;
  clientPhone: string;
}

export async function createAppointment(data: CreateAppointmentData): Promise<Appointment> {
  return apiClient.post<Appointment>('/api/appointments', data);
}

export async function getAllAppointments(): Promise<Appointment[]> {
  // El backend devuelve Page<AppointmentResponse>, extraemos el content
  const page = await apiClient.get<{ content: Appointment[] }>('/api/appointments');
  return page.content;
}

export async function updateAppointmentStatus(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled'
): Promise<Appointment> {
  return apiClient.patch<Appointment>(`/api/appointments/${id}/status`, { status });
}

export async function deleteAppointment(id: string): Promise<void> {
  return apiClient.delete<void>(`/api/appointments/${id}`);
}
