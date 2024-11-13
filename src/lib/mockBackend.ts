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

export async function processRequest({ modelName, text, taskType, steps }: ProcessRequestParams): Promise<string> {
  // Validate inputs
  if (!text.trim()) {
    throw new Error('Input text is required');
  }
  
  if (!modelName.trim()) {
    throw new Error('Model name is required');
  }

  // Simulate processing time based on task and steps
  const baseTime = PROCESSING_TIMES[taskType as keyof typeof PROCESSING_TIMES] || 2000;
  const totalTime = baseTime * steps;
  await sleep(totalTime);

  // Generate mock outputs based on task type
  switch (taskType) {
    case 'summarization':
      return `Summary of the input text (${text.length} chars): ${text.slice(0, 100)}...`;
    case 'qa':
      return `Answer based on context: Based on the provided text, ${text.slice(0, 50)}...`;
    case 'code-generation':
      return `// Generated code based on prompt:\nfunction process() {\n  // Implementation based on: ${text.slice(0, 50)}...\n}`;
    default:
      throw new Error(`Unsupported task type: ${taskType}`);
  }
}

export function saveFeedback(feedback: FeedbackData): void {
  const feedbackList = getFeedbackList();
  feedbackList.push(feedback);
  localStorage.setItem('ttt_feedback', JSON.stringify(feedbackList));
}

export function getFeedbackList(): FeedbackData[] {
  const stored = localStorage.getItem('ttt_feedback');
  return stored ? JSON.parse(stored) : [];
}