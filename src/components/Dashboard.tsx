import React, { useEffect, useState } from 'react';
import { MapPin, Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapView } from './Map';
import { WeatherWidget } from './WeatherWidget';
import { RecommendationCard } from './RecommendationCard';
import { ChatInterface } from './ChatInterface';
import type { WeatherData, Recommendation } from '../types';
import { getWeather } from '../services/weatherService';
import { getRecommendations } from '../services/recommendationService';

interface DashboardProps {
  timeWindow: { start: Date; end: Date };
}

export function Dashboard({ timeWindow }: DashboardProps) {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 24,
    condition: 'Carregando...',
    icon: 'loader'
  });
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather();
      setWeather(data);
      const newRecommendations = getRecommendations(timeWindow, data);
      setRecommendations(newRecommendations);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);

    return () => clearInterval(interval);
  }, [timeWindow]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div 
        className="lg:col-span-2 space-y-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-50">Mapa da Região</h2>
            <div className="flex items-center space-x-2 text-dark-300">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Sapiens Parque</span>
            </div>
          </div>
          <div className="h-96 rounded-lg overflow-hidden">
            <MapView />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-dark-50">Recomendações</h2>
            <CalendarIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))
            ) : (
              <p className="text-sm text-dark-300">
                Nenhuma recomendação disponível para este período.
              </p>
            )}
          </div>
        </div>

        {weather.condition.includes('chuva') && (
          <div className="card p-6 bg-yellow-500/10 border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-dark-50">Alerta</h2>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-dark-300">
                Devido à previsão de chuva, algumas atividades ao ar livre podem estar indisponíveis.
              </p>
            </div>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <WeatherWidget weather={weather} />
        <ChatInterface timeWindow={timeWindow} weather={weather} />
      </motion.div>
    </div>
  );
}