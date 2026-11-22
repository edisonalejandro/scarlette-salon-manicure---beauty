import { useState, useEffect, useCallback } from 'react';
import { GalleryItem } from '../types';
import { getAllGalleryItems, createGalleryItem, deleteGalleryItem } from '../services/galleryService';

export function useGallery() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllGalleryItems();
      setGallery(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar galería'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'createdAt'>) => {
    await createGalleryItem(item);
    await fetchGallery();
  };

  const removeGalleryItem = async (id: string) => {
    await deleteGalleryItem(id);
    await fetchGallery();
  };

  return { gallery, loading, error, addGalleryItem, removeGalleryItem, refetch: fetchGallery };
}
