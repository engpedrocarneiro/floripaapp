import React from 'react';
import { Recommendation } from '../types';
import { getCategoryIcon } from '../services/recommendationService';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface RecommendationCardProps {
  recommendation: Recommendation & { score?: number };
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const IconComponent = Icons[getCategoryIcon(recommendation.category) as keyof typeof Icons];

  return (
    <motion.div 
      className="card p-4 hover:border-primary transition-colors duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <IconComponent className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-dark-100">{recommendation.title}</h3>
            {recommendation.score && (
              <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                {Math.round(recommendation.score)}% match
              </div>
            )}
          </div>
          <p className="text-sm text-dark-300 mt-1">{recommendation.description}</p>
          <div className="flex items-center mt-2 text-sm text-dark-400">
            <span className="flex items-center">
              <Icons.Clock className="w-4 h-4 mr-1" />
              {recommendation.duration}min
            </span>
            <span className="flex items-center ml-4">
              <Icons.MapPin className="w-4 h-4 mr-1" />
              {recommendation.distance}km
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}