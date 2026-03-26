/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  addDoc, 
  query, 
  orderBy,
  onSnapshot,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '../firebase';
import { Appointment } from '../types';

const APPOINTMENTS_COLLECTION = 'appointments';

export interface CreateAppointmentData {
  userId: string | null;
  serviceId: string;
  date: string; // formato: yyyy-MM-dd
  time: string; // formato: HH:mm
  clientName: string;
  clientPhone: string;
}

/**
 * Create a new appointment
 */
export async function createAppointment(data: CreateAppointmentData): Promise<string> {
  const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), {
    ...data,
    status: 'pending',
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

/**
 * Subscribe to appointments (admin only)
 */
export function subscribeToAppointments(callback: (appointments: Appointment[]) => void): Unsubscribe {
  const q = query(collection(db, APPOINTMENTS_COLLECTION), orderBy('date', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const appointments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
    callback(appointments);
  });
}
