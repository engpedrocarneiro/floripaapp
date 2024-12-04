import React from 'react';
import { Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTimeWindow } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';

interface TimeWindowsProps {
  preEventWindow: { start: Date; end: Date } | null;
  postEventWindow: { start: Date; end: Date } | null;
  activeWindow: 'pre' | 'post' | null;
  onWindowSelect: (window: 'pre' | 'post') => void;
}

export function TimeWindows({ 
  preEventWindow, 
  postEventWindow
}: TimeWindowsProps) {
  const navigate = useNavigate();

  if (!preEventWindow && !postEventWindow) return null;

  const handlePlanningClick = () => {
    // Convert Date objects to ISO strings for state transfer
    const state = {
      preEventWindow: preEventWindow ? {
        start: preEventWindow.start.toISOString(),
        end: preEventWindow.end.toISOString()
      } : undefined,
      postEventWindow: postEventWindow ? {
        start: postEventWindow.start.toISOString(),
        end: postEventWindow.end.toISOString()
      } : undefined
    };

    navigate('/planning', { state });
  };

  return (
    <motion.div 
      className="card p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-lg font-semibold text-dark-50">Janelas de Tempo Disponíveis</h2>
        </div>
        <button
          onClick={handlePlanningClick}
          className="button flex items-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Planejar Roteiro</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {preEventWindow && (
          <div className="border-l-2 border-dark-700 pl-4">
            <div>
              <h3 className="text-dark-100 font-medium">Antes do Evento</h3>
              <p className="text-dark-300 text-sm">
                {formatTimeWindow(preEventWindow.start, preEventWindow.end)}
              </p>
            </div>
          </div>
        )}
        
        {postEventWindow && (
          <div className="border-l-2 border-dark-700 pl-4">
            <div>
              <h3 className="text-dark-100 font-medium">Após o Evento</h3>
              <p className="text-dark-300 text-sm">
                {formatTimeWindow(postEventWindow.start, postEventWindow.end)}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}