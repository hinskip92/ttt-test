import axios from 'axios';

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

const BASE_URL = 'https://your-jax-backend-url.com';

export async function processRequest({ modelName, text, taskType, steps }: ProcessRequestParams): Promise<string> {
  try {
    const response = await axios.post(`${BASE_URL}/process`, {
      modelName,
      text,
      taskType,
      steps,
    });
    return response.data.result;
  } catch (error) {
    throw new Error(`Failed to process request: ${error.message}`);
  }
}

export async function saveFeedback(feedback: FeedbackData): Promise<void> {
  try {
    await axios.post(`${BASE_URL}/feedback`, feedback);
  } catch (error) {
    throw new Error(`Failed to save feedback: ${error.message}`);
  }
}
