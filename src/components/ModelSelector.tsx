import React from 'react';
import { Settings } from 'lucide-react';

interface ModelSelectorProps {
  modelName: string;
  onModelChange: (value: string) => void;
}

export default function ModelSelector({ modelName, onModelChange }: ModelSelectorProps) {
  return (
    <div className="relative">
      <div className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
        <Settings className="w-5 h-5 text-indigo-600" />
        <input
          type="text"
          value={modelName}
          onChange={(e) => onModelChange(e.target.value)}
          placeholder="Enter model name (e.g., meta-llama/Llama-2-7b-hf)"
          className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none focus:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );
}