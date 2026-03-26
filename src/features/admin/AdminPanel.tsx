/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CalendarIcon, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Service, Appointment } from '../../types';

interface AdminPanelProps {
  services: Service[];
  appointments: Appointment[];
}

export function AdminPanel({ services, appointments }: AdminPanelProps) {
  return (
    <section id="admin" className="py-24 px-4 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-serif gold-text">Panel de Administración</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Appointments List */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-gold" />
            Próximas Citas
          </h3>
          <div className="space-y-4">
            {appointments.length > 0 ? appointments.map(app => (
              <div key={app.id} className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                <div>
                  <p className="font-bold">{app.clientName}</p>
                  <p className="text-xs text-gray-400">{app.clientPhone}</p>
                  <p className="text-sm text-gold mt-1">
                    {app.date} @ {app.time}
                  </p>
                </div>
                <div className="text-right">
                  <span className={cn(
                    "text-[10px] uppercase tracking-widest px-2 py-1 rounded-full font-bold",
                    app.status === 'confirmed' ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  )}>
                    {app.status}
                  </span>
                </div>
              </div>
            )) : <p className="text-gray-500 text-center py-10">No hay citas registradas.</p>}
          </div>
        </div>

        {/* Services Management */}
        <div className="space-y-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6">Gestión de Servicios</h3>
            <div className="space-y-2">
              {services.map(s => (
                <div key={s.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span>{s.name}</span>
                  <span className="text-gold font-bold">${s.price}</span>
                </div>
              ))}
              <button className="w-full mt-4 py-2 border border-dashed border-white/20 rounded-lg text-gray-500 hover:text-gold hover:border-gold transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Agregar Servicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
