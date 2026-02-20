import { api } from './client';

export const getFlow = () => api.get('/flows/my-flow');

export const saveProgress = (payload: {
  currentStepIndex: number;
  completedStepKeys: string[];
  stepData: Record<string, Record<string, string>>;
}) => api.put('/progress/me', payload);

export const getAnalytics = () => api.get('/analytics/summary');
