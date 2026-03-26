/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy,
  onSnapshot,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '../firebase';
import { GalleryItem } from '../types';

const GALLERY_COLLECTION = 'gallery';

/**
 * Get all gallery items (one-time fetch)
 */
export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  const q = query(collection(db, GALLERY_COLLECTION), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
}

/**
 * Subscribe to gallery changes
 */
export function subscribeToGallery(callback: (items: GalleryItem[]) => void): Unsubscribe {
  const q = query(collection(db, GALLERY_COLLECTION), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryItem));
    callback(items);
  });
}

/**
 * Create a new gallery item
 */
export async function createGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<string> {
  const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
    ...item,
    createdAt: Timestamp.now()
  });
  return docRef.id;
}

/**
 * Seed initial gallery data
 */
export async function seedInitialGallery(): Promise<void> {
  const gallerySnap = await getDocs(collection(db, GALLERY_COLLECTION));
  if (gallerySnap.empty) {
    const initialGallery = [
      { imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=800', title: 'Diseño Minimalista', description: 'Tonos nude con detalles en oro.' },
      { imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=800', title: 'Rojo Clásico', description: 'Esmaltado permanente impecable.' },
      { imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=800', title: 'Soft Gel Art', description: 'Extensiones con diseño a mano alzada.' }
    ];
    
    for (const item of initialGallery) {
      await createGalleryItem(item);
    }
  }
}
