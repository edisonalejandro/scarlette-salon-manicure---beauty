/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import * as appointmentService from '../services/appointmentService';

export function useAppointments(isAdmin: boolean) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const unsubscribe = appointmentService.subscribeToAppointments((updatedAppointments) => {
      setAppointments(updatedAppointments);
      setLoading(false);
    });

    return unsubscribe;
  }, [isAdmin]);

  const createAppointment = async (data: appointmentService.CreateAppointmentData) => {
    return appointmentService.createAppointment(data);
  };

  return {
    appointments,
    loading,
    createAppointment
  };
}
