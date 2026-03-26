/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '../firebase';
import { Service } from '../types';

const SERVICES_COLLECTION = 'services';

/**
 * Get all services (one-time fetch)
 */
export async function getAllServices(): Promise<Service[]> {
  const q = query(collection(db, SERVICES_COLLECTION));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
}

/**
 * Subscribe to services changes
 */
export function subscribeToServices(callback: (services: Service[]) => void): Unsubscribe {
  const q = query(collection(db, SERVICES_COLLECTION));
  return onSnapshot(q, (snapshot) => {
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service));
    callback(services);
  });
}

/**
 * Create a new service
 */
export async function createService(service: Omit<Service, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(db, SERVICES_COLLECTION), service);
  return docRef.id;
}

/**
 * Seed initial services data
 */
export async function seedInitialServices(): Promise<void> {
  const servicesSnap = await getDocs(collection(db, SERVICES_COLLECTION));
  if (servicesSnap.empty) {
    const initialServices = [
      { name: 'Manicura Rusa', price: 15000, duration: 60, description: 'Limpieza profunda de cutículas y esmaltado permanente.' },
      { name: 'Soft Gel', price: 25000, duration: 90, description: 'Extensiones de uñas con sistema soft gel para un acabado natural.' },
      { name: 'Esmaltado Permanente', price: 12000, duration: 45, description: 'Esmaltado de larga duración con diseño simple.' },
      { name: 'Retiro + Nutrición', price: 8000, duration: 30, description: 'Retiro seguro de producto y tratamiento fortalecedor.' }
    ];
    
    for (const service of initialServices) {
      await createService(service);
    }
  }
}
