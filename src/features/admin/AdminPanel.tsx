/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CalendarIcon, CheckCircle, XCircle, Trash2, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Service, Appointment } from '../../types';

interface AdminPanelProps {
  services: Service[];
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled') => Promise<void>;
  onDeleteAppointment: (id: string) => Promise<void>;
}

export function AdminPanel({ services, appointments, onUpdateStatus, onDeleteAppointment }: AdminPanelProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    setLoadingId(id);
    try {
      await onUpdateStatus(id, status);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar esta cita?')) return;
    setLoadingId(id);
    try {
      await onDeleteAppointment(id);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="admin" className="py-24 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <span className="eyebrow">Solo administración</span>
          <h2 className="mt-4 text-5xl text-ink">Panel de <em className="mark">administración</em></h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments List */}
        <div className="card p-6">
          <h3 className="text-2xl text-ink mb-6 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-rose-deep" strokeWidth={1.75} />
            Próximas Citas
          </h3>
          <div className="space-y-4">
            {appointments.length > 0 ? appointments.map(app => (
              <div key={app.id} className="p-4 bg-cream rounded-2xl border border-line flex justify-between items-center gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate">{app.clientName}</p>
                  <p className="text-xs text-muted">{app.clientPhone}</p>
                  <p className="text-sm text-rose-deep font-medium mt-1">
                    {app.date} @ {app.time}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold",
                    app.status === 'confirmed' ? "bg-emerald-100 text-emerald-800" :
                    app.status === 'cancelled' ? "bg-red-100 text-red-800" :
                    "bg-amber-100 text-amber-800"
                  )}>
                    {app.status}
                  </span>
                  {app.status === 'pending' && (
                    <div className="flex gap-1">
                      <button
                        disabled={loadingId === app.id}
                        onClick={() => handleStatus(app.id, 'confirmed')}
                        title="Confirmar"
                        className="p-1 text-muted hover:text-emerald-700 transition-colors disabled:opacity-40"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        disabled={loadingId === app.id}
                        onClick={() => handleStatus(app.id, 'cancelled')}
                        title="Cancelar"
                        className="p-1 text-muted hover:text-red-700 transition-colors disabled:opacity-40"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  <button
                    disabled={loadingId === app.id}
                    onClick={() => handleDelete(app.id)}
                    title="Eliminar"
                    className="p-1 text-muted hover:text-red-700 transition-colors disabled:opacity-40"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )) : <p className="text-muted text-center py-10">No hay citas registradas.</p>}
          </div>
        </div>

        {/* Services Management */}
        <div className="space-y-8">
          <div className="card p-6">
            <h3 className="text-2xl text-ink mb-6">Gestión de Servicios</h3>
            <div className="space-y-2">
              {services.map(s => (
                <div key={s.id} className="flex justify-between items-center p-3 bg-cream rounded-xl text-ink">
                  <span>{s.name}</span>
                  <span className="font-semibold">${s.price}</span>
                </div>
              ))}
              <button className="w-full mt-4 py-3 border border-dashed border-line rounded-xl text-muted hover:text-rose-deep hover:border-rose-deep transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Agregar Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

