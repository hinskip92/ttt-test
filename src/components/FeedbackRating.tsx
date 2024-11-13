import React from 'react';
import { Star } from 'lucide-react';

interface FeedbackRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function FeedbackRating({ rating, onRatingChange }: FeedbackRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => onRatingChange(value)}
          className={`p-1 rounded-full transition-colors ${
            value <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
          }`}
        >
          <Star className="w-6 h-6 fill-current" />
        </button>
      ))}
    </div>
  );
}