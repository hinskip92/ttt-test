export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}