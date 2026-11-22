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
import { BookingComingSoon } from './BookingComingSoon';
import { startOfToday } from 'date-fns';
import { User } from 'firebase/auth';

interface BookingSectionProps {
  services: Service[];
  /** true cuando no hay servicios disponibles (p. ej. backend aún no publicado) */
  unavailable?: boolean;
  user: User | null;
  onBookingComplete: (data: {
    serviceId: string;
    date: string;
    time: string;
    clientName: string;
    clientPhone: string;
  }) => Promise<void>;
}

export function BookingSection({ services, unavailable = false, user, onBookingComplete }: BookingSectionProps) {
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
    <section id="booking" className="py-24 md:py-32 bg-gradient-to-b from-sand/60 to-butter/40 border-y border-line relative">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <span className="eyebrow">Reservas online</span>
          <h2 className="mt-4 text-5xl md:text-6xl text-ink">
            Reserva tu <em className="mark">hora</em>
          </h2>
          <p className="mt-4 text-muted">
            {unavailable
              ? 'Agenda tu momento para consentirte.'
              : 'Selecciona el servicio y la fecha que más te acomode.'}
          </p>
        </div>

        <div className="card p-6 sm:p-8 md:p-12 shadow-xl shadow-ink/[0.03]">
          {unavailable ? (
            <BookingComingSoon />
          ) : (
          <>
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
          </>
          )}
        </div>
      </div>
    </section>
  );
}
