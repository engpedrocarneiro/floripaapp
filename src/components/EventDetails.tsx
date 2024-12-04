import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { EVENT } from '../constants/event';
import { formatTimeWindow } from '../utils/dateUtils';

export function EventDetails() {
  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-bold text-dark-50 mb-4">{EVENT.name}</h2>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-dark-200">
              {formatTimeWindow(EVENT.startDate, EVENT.endDate)}
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <MapPin className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-dark-100">{EVENT.location.name}</p>
            <p className="text-dark-300">{EVENT.location.address}</p>
            <p className="text-dark-300">
              {EVENT.location.neighborhood}, {EVENT.location.city} - {EVENT.location.state}
            </p>
            <p className="text-dark-300">CEP: {EVENT.location.zipCode}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-dark-200">{EVENT.location.contact.phone}</p>
            <p className="text-dark-300">Ouvidoria: {EVENT.location.contact.hotline}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="w-5 h-5 text-primary mt-1" />
          <div>
            <p className="text-dark-200">{EVENT.location.contact.email}</p>
            <p className="text-dark-300">
              Horário de Expediente: {EVENT.location.contact.businessHours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}