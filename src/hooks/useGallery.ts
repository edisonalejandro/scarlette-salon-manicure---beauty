/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import * as galleryService from '../services/galleryService';

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Subscribe to gallery changes
    const unsubscribe = galleryService.subscribeToGallery((items) => {
      setGallery(items);
      setLoading(false);
    });

    // Seed initial data if needed
    galleryService.seedInitialGallery().catch((err) => {
      console.error('Error seeding gallery:', err);
      setError(err);
    });

    return unsubscribe;
  }, []);

  return {
    gallery,
    loading,
    error
  };
}
