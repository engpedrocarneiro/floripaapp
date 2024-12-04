import React from 'react';
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  CloudDrizzle, 
  Wind,
  Droplets,
  Thermometer,
  Umbrella,
  Sun as UVIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { WeatherData } from '../types';

interface WeatherWidgetProps {
  weather: WeatherData;
}

const weatherIcons: Record<string, React.ComponentType> = {
  sun: Sun,
  cloud: Cloud,
  'cloud-rain': CloudRain,
  'cloud-lightning': CloudLightning,
  'cloud-snow': CloudSnow,
  'cloud-drizzle': CloudDrizzle,
  wind: Wind
};

function getUVDescription(uv: number): { text: string; color: string } {
  if (uv <= 2) return { text: 'Baixo', color: 'text-green-400' };
  if (uv <= 5) return { text: 'Moderado', color: 'text-yellow-400' };
  if (uv <= 7) return { text: 'Alto', color: 'text-orange-400' };
  if (uv <= 10) return { text: 'Muito Alto', color: 'text-red-400' };
  return { text: 'Extremo', color: 'text-purple-400' };
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const WeatherIcon = weatherIcons[weather.icon] || Cloud;
  const uvInfo = getUVDescription(weather.uv);

  return (
    <motion.div 
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-dark-50">Clima em Florianópolis</h2>
        <WeatherIcon className="w-6 h-6 text-primary animate-pulse-slow" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-dark-50 mb-2">
            {weather.temperature}°C
          </div>
          <p className="text-dark-300 capitalize">{weather.condition}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-dark-300">
              <Thermometer className="w-4 h-4 mr-2" />
              Sensação
            </div>
            <span className="text-dark-100">{weather.feelsLike}°C</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-dark-300">
              <Droplets className="w-4 h-4 mr-2" />
              Umidade
            </div>
            <span className="text-dark-100">{weather.humidity}%</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-dark-300">
              <Wind className="w-4 h-4 mr-2" />
              Vento
            </div>
            <span className="text-dark-100">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-dark-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-dark-300">
            <UVIcon className="w-4 h-4 mr-2" />
            Índice UV
          </div>
          <span className={`text-sm font-medium ${uvInfo.color}`}>
            {uvInfo.text}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-dark-300">
            <Umbrella className="w-4 h-4 mr-2" />
            Chuva
          </div>
          <span className="text-sm text-dark-100">
            {weather.precipitation > 0 
              ? `${weather.precipitation} mm/h`
              : 'Sem chuva'
            }
          </span>
        </div>
      </div>
    </motion.div>
  );
}