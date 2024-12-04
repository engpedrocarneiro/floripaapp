export interface EventTime {
  arrival: Date;
  departure: Date;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uv: number;
  precipitation: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  duration: number;
  distance: number;
  category: 'beach' | 'food' | 'culture' | 'activity';
  weatherDependent: boolean;
}