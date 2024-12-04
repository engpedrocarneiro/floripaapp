import axios from 'axios';
import { WeatherData } from '../types';

const API_KEY = '4ea1df5bade2b1c2c06ebf4e28406202';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const FLORIPA_COORDS = {
  lat: -27.5969,
  lon: -48.5495
};

export async function getWeather(): Promise<WeatherData> {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat: FLORIPA_COORDS.lat,
        lon: FLORIPA_COORDS.lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'pt_br'
      }
    });

    const data = response.data;
    
    return {
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      condition: data.weather[0].description,
      icon: mapWeatherIcon(data.weather[0].icon),
      uv: calculateUVIndex(data.clouds.all, data.weather[0].id),
      precipitation: data.rain ? data.rain['1h'] || 0 : 0
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return {
      temperature: 24,
      feelsLike: 26,
      humidity: 70,
      windSpeed: 15,
      condition: 'Dados indisponíveis',
      icon: 'cloud',
      uv: 0,
      precipitation: 0
    };
  }
}

function mapWeatherIcon(apiIcon: string): string {
  const iconMap: Record<string, string> = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud-sun',
    '02n': 'cloud-moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'clouds',
    '04n': 'clouds',
    '09d': 'cloud-drizzle',
    '09n': 'cloud-drizzle',
    '10d': 'cloud-rain',
    '10n': 'cloud-rain',
    '11d': 'cloud-lightning',
    '11n': 'cloud-lightning',
    '13d': 'cloud-snow',
    '13n': 'cloud-snow',
    '50d': 'cloud-fog',
    '50n': 'cloud-fog'
  };

  return iconMap[apiIcon] || 'cloud';
}

function calculateUVIndex(cloudCover: number, weatherId: number): number {
  // Basic UV index calculation based on cloud cover and weather conditions
  const baseUV = 10; // Maximum UV index on a clear day
  const cloudFactor = 1 - (cloudCover / 100);
  
  // Reduce UV for precipitation weather conditions
  const weatherFactor = weatherId >= 200 && weatherId < 700 ? 0.5 : 1;
  
  return Math.round(baseUV * cloudFactor * weatherFactor);
}