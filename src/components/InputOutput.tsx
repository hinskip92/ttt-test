import React from 'react';
import { Send } from 'lucide-react';

interface InputOutputProps {
  input: string;
  output: string;
  error?: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

export default function InputOutput({ 
  input, 
  output, 
  error,
  onInputChange, 
  onSubmit, 
  isProcessing 
}: InputOutputProps) {
  return (
    <div className="grid grid-cols-2 gap-6 h-full">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Input Text</label>
        <div className="relative flex-1">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter your text here..."
            className="w-full h-full p-4 text-sm text-gray-700 bg-white rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
          />
          <button
            onClick={onSubmit}
            disabled={isProcessing || !input.trim()}
            className="absolute bottom-4 right-4 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-2">Output</label>
        <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {isProcessing ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : output ? (
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{output}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">Output will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
}