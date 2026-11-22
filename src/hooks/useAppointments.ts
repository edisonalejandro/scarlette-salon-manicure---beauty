import { useState, useEffect, useCallback } from 'react';
import { Appointment } from '../types';
import {
  CreateAppointmentData,
  createAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../services/appointmentService';

export function useAppointments(isAdmin: boolean) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = useCallback(async () => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getAllAppointments();
      setAppointments(data);
    } catch (err) {
      console.error('Error al cargar citas:', err);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleCreateAppointment = async (data: CreateAppointmentData) => {
    return createAppointment(data);
  };

  const handleUpdateStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    await updateAppointmentStatus(id, status);
    await fetchAppointments();
  };

  const handleDeleteAppointment = async (id: string) => {
    await deleteAppointment(id);
    await fetchAppointments();
  };

  return {
    appointments,
    loading,
    createAppointment: handleCreateAppointment,
    updateStatus: handleUpdateStatus,
    deleteAppointment: handleDeleteAppointment,
    refetch: fetchAppointments,
  };
}
