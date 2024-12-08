import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ocean-light to-ocean-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Descubra Florianópolis
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Planeje sua viagem perfeita com recomendações personalizadas e informações em tempo real.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/cadastro"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Começar Agora
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-transparent hover:bg-primary/10"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <MapPin className="w-12 h-12 text-primary animate-bounce" />
      </div>
    </div>
  );
}