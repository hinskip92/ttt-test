import React from 'react';
import { Code, MessageSquare, FileText } from 'lucide-react';

interface TaskSelectorProps {
  selectedTask: string;
  onTaskChange: (task: string) => void;
}

const tasks = [
  { id: 'summarization', label: 'Summarization', icon: FileText },
  { id: 'qa', label: 'Q&A', icon: MessageSquare },
  { id: 'code-generation', label: 'Code Generation', icon: Code },
];

export default function TaskSelector({ selectedTask, onTaskChange }: TaskSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {tasks.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTaskChange(id)}
          className={`flex flex-col items-center p-4 rounded-lg transition-all ${
            selectedTask === id
              ? 'bg-indigo-50 border-2 border-indigo-500 text-indigo-700'
              : 'bg-white border border-gray-100 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/50'
          }`}
        >
          <Icon className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">{label}</span>
        </button>
      ))}
    </div>
  );
}