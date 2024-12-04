import React, { useState } from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { validateTimeWindow } from '../utils/dateUtils';
import { EVENT } from '../constants/event';
import type { EventTime } from '../types';

interface TimeInputProps {
  onTimeSubmit: (arrival: Date, departure: Date) => void;
  initialValues?: EventTime;
}

export function TimeInput({ onTimeSubmit, initialValues }: TimeInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const arrival = new Date(formData.get('arrival') as string);
    const departure = new Date(formData.get('departure') as string);
    
    const validationError = validateTimeWindow(arrival, departure);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    onTimeSubmit(arrival, departure);
  };

  return (
    <motion.div 
      className="card p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <Clock className="w-5 h-5 text-primary mr-2" />
        <h2 className="text-lg font-semibold text-dark-50">Planeje sua Visita</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="arrival" className="block text-sm font-medium text-dark-200 mb-2">
              Chegada em Florianópolis
            </label>
            <input
              type="datetime-local"
              name="arrival"
              id="arrival"
              defaultValue={initialValues?.arrival.toISOString().slice(0, 16)}
              max={EVENT.startDate.toISOString().slice(0, 16)}
              className="input w-full"
              required
            />
            <p className="mt-1 text-sm text-dark-400">
              Deve ser anterior ao início do evento
            </p>
          </div>
          <div>
            <label htmlFor="departure" className="block text-sm font-medium text-dark-200 mb-2">
              Partida de Florianópolis
            </label>
            <input
              type="datetime-local"
              name="departure"
              id="departure"
              defaultValue={initialValues?.departure.toISOString().slice(0, 16)}
              min={EVENT.endDate.toISOString().slice(0, 16)}
              className="input w-full"
              required
            />
            <p className="mt-1 text-sm text-dark-400">
              Deve ser posterior ao término do evento
            </p>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-900/20 border border-red-900/30 rounded-md p-3 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}
        
        <button type="submit" className="button w-full">
          Começar Agora
        </button>
      </form>
    </motion.div>
  );
}