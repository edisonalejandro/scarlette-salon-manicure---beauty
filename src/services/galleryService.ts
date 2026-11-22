import { apiClient } from '../lib/apiClient';
import { GalleryItem } from '../types';

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  return apiClient.get<GalleryItem[]>('/api/gallery');
}

export async function createGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> {
  return apiClient.post<GalleryItem>('/api/gallery', item);
}

export async function deleteGalleryItem(id: string): Promise<void> {
  return apiClient.delete<void>(`/api/gallery/${id}`);
}
