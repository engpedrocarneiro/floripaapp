import { Recommendation } from '../types';
import { isWithinInterval, differenceInMinutes, getHours } from 'date-fns';
import { WeatherData } from '../types';

const ACTIVITIES: Recommendation[] = [
  {
    id: '1',
    title: 'Praia de Canasvieiras',
    description: 'Praia com águas calmas e ótima infraestrutura. Ideal para famílias.',
    duration: 180,
    distance: 2.5,
    category: 'beach',
    weatherDependent: true
  },
  {
    id: '2',
    title: 'Restaurante Marisqueira',
    description: 'Frutos do mar frescos com vista para o mar. Especialidade em camarão.',
    duration: 90,
    distance: 1.8,
    category: 'food',
    weatherDependent: false
  },
  {
    id: '3',
    title: 'Projeto TAMAR',
    description: 'Centro de conservação de tartarugas marinhas com exposições educativas.',
    duration: 120,
    distance: 3.2,
    category: 'culture',
    weatherDependent: false
  },
  {
    id: '4',
    title: 'Forte São José da Ponta Grossa',
    description: 'Fortificação histórica do século XVIII com vista panorâmica.',
    duration: 150,
    distance: 4.5,
    category: 'culture',
    weatherDependent: false
  },
  {
    id: '5',
    title: 'Stand Up Paddle em Canasvieiras',
    description: 'Aluguel de equipamentos e aulas para iniciantes.',
    duration: 120,
    distance: 2.8,
    category: 'activity',
    weatherDependent: true
  },
  {
    id: '6',
    title: 'Mercado Municipal de Florianópolis',
    description: 'Mercado histórico com gastronomia local e artesanato.',
    duration: 120,
    distance: 15,
    category: 'culture',
    weatherDependent: false
  }
];

interface TimeWindow {
  start: Date;
  end: Date;
}

function calculateActivityScore(
  activity: Recommendation,
  weather: WeatherData,
  timeWindow: TimeWindow
): number {
  let score = 100; // Base score

  // Weather impact
  if (activity.weatherDependent) {
    if (weather.condition.includes('chuva')) {
      score -= 50;
    } else if (weather.condition.includes('nublado')) {
      score -= 20;
    }
    
    // Temperature considerations
    if (activity.category === 'beach' || activity.category === 'activity') {
      if (weather.temperature < 20) {
        score -= 30;
      } else if (weather.temperature > 30) {
        score -= 10;
      }
    }
  }

  // Time of day optimization
  const hour = getHours(timeWindow.start);
  
  // Adjust scores based on optimal times for activities
  switch (activity.category) {
    case 'beach':
      // Beaches are best from mid-morning to late afternoon
      if (hour >= 10 && hour <= 16) {
        score += 20;
      } else if (hour < 8 || hour > 18) {
        score -= 30;
      }
      break;
    case 'food':
      // Restaurants score higher during typical meal times
      if ((hour >= 11 && hour <= 14) || (hour >= 18 && hour <= 22)) {
        score += 25;
      }
      break;
    case 'culture':
      // Cultural activities are good during standard business hours
      if (hour >= 9 && hour <= 17) {
        score += 15;
      }
      break;
    case 'activity':
      // Outdoor activities are best in the morning or late afternoon
      if ((hour >= 7 && hour <= 10) || (hour >= 16 && hour <= 18)) {
        score += 20;
      } else if (hour >= 11 && hour <= 15) {
        score -= 10; // Too hot during midday
      }
      break;
  }

  // Distance penalty (slight penalty for farther locations)
  score -= activity.distance * 2;

  // Duration optimization (prefer activities that use time window efficiently)
  const availableTime = differenceInMinutes(timeWindow.end, timeWindow.start);
  const timeUtilization = activity.duration / availableTime;
  if (timeUtilization >= 0.5 && timeUtilization <= 0.8) {
    score += 15; // Bonus for good time utilization
  }

  return Math.max(0, Math.min(100, score)); // Ensure score stays between 0 and 100
}

export function getRecommendations(
  timeWindow: TimeWindow,
  weather: WeatherData
): Recommendation[] {
  const availableTime = differenceInMinutes(timeWindow.end, timeWindow.start);
  
  return ACTIVITIES
    .filter(activity => {
      // Basic filtering for time constraints
      if (activity.duration > availableTime) {
        return false;
      }
      
      // Completely exclude weather-dependent activities in severe weather
      if (activity.weatherDependent && 
          (weather.condition.includes('tempestade') || 
           weather.condition.includes('temporal'))) {
        return false;
      }

      return true;
    })
    .map(activity => ({
      ...activity,
      score: calculateActivityScore(activity, weather, timeWindow)
    }))
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, 4); // Return top 4 recommendations
}

export function getCategoryIcon(category: Recommendation['category']): string {
  const iconMap: Record<Recommendation['category'], string> = {
    beach: 'Umbrella',
    food: 'UtensilsCrossed',
    culture: 'Landmark',
    activity: 'Activity'
  };
  
  return iconMap[category];
}