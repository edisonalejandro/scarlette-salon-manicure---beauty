export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string;
}

export interface Appointment {
  id: string;
  userId?: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  clientName: string;
  clientPhone: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title?: string;
  description?: string;
  createdAt: any;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'client';
}
