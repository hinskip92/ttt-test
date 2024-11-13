import { sleep } from './utils';

export interface ProcessRequestParams {
  modelName: string;
  text: string;
  taskType: string;
  steps: number;
}

export interface FeedbackData {
  modelName: string;
  taskType: string;
  steps: number;
  feedbackScore: number;
  input: string;
  output: string;
  timestamp: number;
}

// Simulated processing delays (ms)
const PROCESSING_TIMES = {
  summarization: 2000,
  qa: 1500,
  'code-generation': 3000,
};

export function getFeedbackList(): FeedbackData[] {
  const stored = localStorage.getItem('ttt_feedback');
  return stored ? JSON.parse(stored) : [];
}
