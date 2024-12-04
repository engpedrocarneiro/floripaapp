import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface AddEventModalProps {
  start: Date;
  end: Date;
  onClose: () => void;
  onAdd: (title: string, description: string, start: Date, end: Date) => void;
}

export function AddEventModal({ start: windowStart, end: windowEnd, onClose, onAdd }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState(windowStart);
  const [end, setEnd] = useState(windowEnd);
  const [error, setError] = useState<string | null>(null);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = new Date(e.target.value);
    
    if (newStart < windowStart || newStart > windowEnd) {
      setError('O horário deve estar dentro da janela disponível');
      return;
    }

    setStart(newStart);
    setError(null);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = new Date(e.target.value);
    
    if (newEnd < windowStart || newEnd > windowEnd) {
      setError('O horário deve estar dentro da janela disponível');
      return;
    }

    if (newEnd <= start) {
      setError('O horário de término deve ser posterior ao horário de início');
      return;
    }

    setEnd(newEnd);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || error) return;
    
    if (start < windowStart || end > windowEnd) {
      setError('O evento deve estar dentro da janela de tempo disponível');
      return;
    }
    
    onAdd(title, description, start, end);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-dark-50">Adicionar Evento</h3>
          <button
            onClick={onClose}
            className="text-dark-400 hover:text-dark-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-dark-200 mb-1">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input w-full"
              placeholder="Nome do evento"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-dark-200 mb-1">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input w-full h-24 resize-none"
              placeholder="Detalhes do evento"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="start-time" className="block text-sm font-medium text-dark-200 mb-1">
                Horário de Início
              </label>
              <input
                type="datetime-local"
                id="start-time"
                value={format(start, "yyyy-MM-dd'T'HH:mm")}
                onChange={handleStartChange}
                className="input w-full"
                min={format(windowStart, "yyyy-MM-dd'T'HH:mm")}
                max={format(windowEnd, "yyyy-MM-dd'T'HH:mm")}
                required
              />
            </div>
            <div>
              <label htmlFor="end-time" className="block text-sm font-medium text-dark-200 mb-1">
                Horário de Término
              </label>
              <input
                type="datetime-local"
                id="end-time"
                value={format(end, "yyyy-MM-dd'T'HH:mm")}
                onChange={handleEndChange}
                className="input w-full"
                min={format(windowStart, "yyyy-MM-dd'T'HH:mm")}
                max={format(windowEnd, "yyyy-MM-dd'T'HH:mm")}
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm bg-red-500/10 border border-red-500/20 rounded-md p-2">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-dark-300 hover:text-dark-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="button flex items-center"
              disabled={!title.trim() || !!error}
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}