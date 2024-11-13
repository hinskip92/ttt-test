import React from 'react';
import { Timer } from 'lucide-react';

interface StepsSliderProps {
  steps: number;
  onStepsChange: (steps: number) => void;
}

export default function StepsSlider({ steps, onStepsChange }: StepsSliderProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">TTT Steps</span>
        </div>
        <span className="text-sm font-semibold text-indigo-600">{steps}</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={steps}
        onChange={(e) => onStepsChange(parseInt(e.target.value))}
        className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500">1</span>
        <span className="text-xs text-gray-500">5</span>
      </div>
    </div>
  );
}