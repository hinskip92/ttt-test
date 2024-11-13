import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import ModelSelector from './components/ModelSelector';
import TaskSelector from './components/TaskSelector';
import StepsSlider from './components/StepsSlider';
import InputOutput from './components/InputOutput';
import FeedbackRating from './components/FeedbackRating';
import { processRequest, saveFeedback } from './lib/backend';
import { formatError } from './lib/utils';

export default function App() {
  const [modelName, setModelName] = useState('meta-llama/Llama-2-7b-hf');
  const [selectedTask, setSelectedTask] = useState('summarization');
  const [steps, setSteps] = useState(1);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    setIsProcessing(true);
    setError('');
    setOutput('');
    setRating(0);

    try {
      const result = await processRequest({
        modelName,
        text: input,
        taskType: selectedTask,
        steps,
      });
      setOutput(result);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRating = (score: number) => {
    setRating(score);
    saveFeedback({
      modelName,
      taskType: selectedTask,
      steps,
      feedbackScore: score,
      input,
      output,
      timestamp: Date.now(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Adaptive TTT Tool</h1>
          <p className="mt-2 text-gray-600">Test-Time Training with Real-Time Feedback</p>
        </div>

        <div className="space-y-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <ModelSelector modelName={modelName} onModelChange={setModelName} />
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Select Task</label>
            <TaskSelector selectedTask={selectedTask} onTaskChange={setSelectedTask} />
          </div>
          
          <StepsSlider steps={steps} onStepsChange={setSteps} />
          
          <div className="h-96">
            <InputOutput
              input={input}
              output={output}
              error={error}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
            />
          </div>
          
          {output && !isProcessing && !error && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm font-medium text-gray-700">Rate the output quality:</span>
              <FeedbackRating rating={rating} onRatingChange={handleRating} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
