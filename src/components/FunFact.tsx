import React from 'react';
import { Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const funFacts = [
  "Florianópolis é conhecida como 'Ilha da Magia' devido às suas lendas e histórias místicas.",
  "A cidade possui 42 praias, cada uma com características únicas.",
  "A Ponte Hercílio Luz é a maior ponte pênsil do Brasil.",
  "O nome Florianópolis é uma homenagem ao Marechal Floriano Peixoto.",
  "A cidade tem uma das maiores concentrações de golfinhos do Brasil.",
  "A Praia do Santinho possui inscrições rupestres de mais de 4.000 anos.",
  "Florianópolis é considerada a capital com melhor qualidade de vida do Brasil.",
  "A cidade possui o único farol aberto à visitação em Santa Catarina.",
  "A Lagoa da Conceição tem água salgada, apesar de ser uma lagoa.",
  "O Mercado Público de Florianópolis existe desde 1898."
];

export function FunFact() {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  return (
    <motion.div 
      className="card p-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-dark-200 mb-1">
            Você sabia?
          </h3>
          <p className="text-sm text-dark-300 mb-3">
            {randomFact}
          </p>
          <div className="flex justify-end">
            <div className="relative">
              <button 
                className="button text-sm py-1.5 px-3"
                disabled
              >
                Saiba mais
              </button>
              <div className="absolute -top-2 right-0 transform translate-y-0.5 px-2 py-0.5 bg-primary/10 rounded text-xs text-primary font-medium">
                Em breve
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}