import React from 'react';
import { Map, Calendar, Sun, Clock } from 'lucide-react';

const features = [
  {
    title: 'Mapa Interativo',
    description: 'Explore os melhores pontos turísticos de Florianópolis com nosso mapa interativo.',
    icon: Map
  },
  {
    title: 'Previsão do Tempo',
    description: 'Informações meteorológicas em tempo real para planejar melhor suas atividades.',
    icon: Sun
  },
  {
    title: 'Planejamento Inteligente',
    description: 'Organize seu roteiro de forma eficiente com recomendações personalizadas.',
    icon: Calendar
  },
  {
    title: 'Janelas de Tempo',
    description: 'Aproveite ao máximo seu tempo com sugestões baseadas em sua disponibilidade.',
    icon: Clock
  }
];

export function FeaturesSection() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Recursos Principais
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Tudo que você precisa para aproveitar o melhor de Florianópolis
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-primary rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}