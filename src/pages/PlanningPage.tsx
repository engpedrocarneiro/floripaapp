import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CalendarView } from '../components/calendar/CalendarView';
import { PlanningAssistant } from '../components/PlanningAssistant';
import { WeatherWidget } from '../components/WeatherWidget';
import { FunFact } from '../components/FunFact';
import { getWeather } from '../services/weatherService';
import type { WeatherData } from '../types';

interface LocationState {
  preEventWindow?: { start: string; end: string };
  postEventWindow?: { start: string; end: string };
}

export function PlanningPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeWindow, setActiveWindow] = useState<'pre' | 'post'>('pre');
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    feelsLike: 26,
    humidity: 70,
    windSpeed: 15,
    condition: 'Carregando...',
    icon: 'sun',
    uv: 5,
    precipitation: 0
  });

  const state = location.state as LocationState;
  
  const windows = {
    pre: state?.preEventWindow ? {
      start: new Date(state.preEventWindow.start),
      end: new Date(state.preEventWindow.end),
      type: 'pre' as const
    } : null,
    post: state?.postEventWindow ? {
      start: new Date(state.postEventWindow.start),
      end: new Date(state.postEventWindow.end),
      type: 'post' as const
    } : null
  };

  useEffect(() => {
    if (!state?.preEventWindow && !state?.postEventWindow) {
      navigate('/');
      return;
    }

    const fetchWeather = async () => {
      const data = await getWeather();
      setWeather(data);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [state, navigate]);

  const currentWindow = windows[activeWindow];
  
  if (!currentWindow) return null;

  const events = [{
    id: 'time-window',
    title: `${activeWindow === 'pre' ? 'Pré' : 'Pós'}-Evento`,
    start: currentWindow.start,
    end: currentWindow.end,
    isTimeWindow: true
  }];

  return (
    <motion.div 
      className="min-h-screen bg-dark-950 p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-dark-200 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveWindow('pre')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeWindow === 'pre'
                  ? 'bg-primary text-white'
                  : 'text-dark-200 hover:text-dark-50'
              }`}
            >
              Pré-Evento
            </button>
            <button
              onClick={() => setActiveWindow('post')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeWindow === 'post'
                  ? 'bg-primary text-white'
                  : 'text-dark-200 hover:text-dark-50'
              }`}
            >
              Pós-Evento
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="card flex-1">
              <CalendarView events={events} />
            </div>
          </div>

          <div className="flex flex-col h-[calc(100vh-8rem)]">
            <WeatherWidget weather={weather} />
            <div className="flex-1 mt-6">
              <PlanningAssistant timeWindow={currentWindow} />
            </div>
            <FunFact />
          </div>
        </div>
      </div>
    </motion.div>
  );
}