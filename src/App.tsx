/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { GallerySection } from './features/gallery/GallerySection';
import { BookingSection } from './features/booking/BookingSection';
import { AdminPanel } from './features/admin/AdminPanel';
import { useAuth } from './hooks/useAuth';
import { useServices } from './hooks/useServices';
import { useGallery } from './hooks/useGallery';
import { useAppointments } from './hooks/useAppointments';

export default function App() {
  // Custom hooks manage all state and side effects
  const { user, isAdmin, loading: authLoading, signIn, signOut } = useAuth();
  const { services } = useServices();
  const { gallery } = useGallery();
  const { appointments, createAppointment } = useAppointments(isAdmin);

  // Handle booking submission
  const handleBookingComplete = async (data: {
    serviceId: string;
    date: string;
    time: string;
    clientName: string;
    clientPhone: string;
  }) => {
    await createAppointment({
      userId: user?.uid || null,
      ...data
    });
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navbar user={user} isAdmin={isAdmin} onLogin={signIn} onLogout={signOut} />
      
      <Hero />
      
      <GallerySection items={gallery} />
      
      <BookingSection 
        services={services}
        user={user}
        onBookingComplete={handleBookingComplete}
      />
      
      {isAdmin && (
        <AdminPanel 
          services={services}
          appointments={appointments}
        />
      )}
      
      <Footer />
    </div>
  );
}
