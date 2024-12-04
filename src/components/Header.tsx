import React from 'react';
import { Palmtree, MapPin, Sun } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-dark-900 border-b border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Palmtree className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-dark-50">Floripa_lend</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center text-dark-200">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              <span>Sapiens Parque</span>
            </div>
            <div className="flex items-center text-dark-200">
              <Sun className="w-5 h-5 mr-2 text-primary" />
              <span>24°C</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}