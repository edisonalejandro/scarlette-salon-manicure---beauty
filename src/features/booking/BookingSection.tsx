/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Service } from '../../types';
import { BookingSteps } from './BookingSteps';
import { ServiceSelection } from './ServiceSelection';
import { DateTimeSelection } from './DateTimeSelection';
import { BookingConfirmation } from './BookingConfirmation';
import { BookingSuccess } from './BookingSuccess';
import { startOfToday } from 'date-fns';
import { User } from 'firebase/auth';

interface BookingSectionProps {
  services: Service[];
  user: User | null;
  onBookingComplete: (data: {
    serviceId: string;
    date: string;
    time: string;
    clientName: string;
    clientPhone: string;
  }) => Promise<void>;
}

export function BookingSection({ services, user, onBookingComplete }: BookingSectionProps) {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '' });

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setBookingStep(2);
  };

  const handleDateTimeConfirm = () => {
    setBookingStep(3);
  };

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedTime) return;

    await onBookingComplete({
      serviceId: selectedService.id!,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      clientName: clientInfo.name,
      clientPhone: clientInfo.phone
    });

    setBookingStep(4);
  };

  const handleReset = () => {
    setBookingStep(1);
    setSelectedService(null);
    setSelectedTime(null);
    setClientInfo({ name: '', phone: '' });
  };

  return (
    <section id="booking" className="py-24 bg-soft-black relative">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Reserva tu Hora</h2>
          <p className="text-gray-400">Selecciona el servicio y la fecha que más te acomode.</p>
        </div>

        <div className="glass-card p-6 md:p-10">
          <BookingSteps currentStep={bookingStep} />

          {bookingStep === 1 && (
            <ServiceSelection 
              services={services}
              onSelect={handleServiceSelect}
            />
          )}

          {bookingStep === 2 && (
            <DateTimeSelection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeSelect={setSelectedTime}
              onConfirm={handleDateTimeConfirm}
              onBack={() => setBookingStep(1)}
            />
          )}

          {bookingStep === 3 && selectedService && (
            <BookingConfirmation
              service={selectedService}
              date={selectedDate}
              time={selectedTime!}
              clientInfo={clientInfo}
              onClientInfoChange={setClientInfo}
              onConfirm={handleBookingSubmit}
              onBack={() => setBookingStep(2)}
            />
          )}

          {bookingStep === 4 && (
            <BookingSuccess onReset={handleReset} />
          )}
        </div>
      </div>
    </section>
  );
}
