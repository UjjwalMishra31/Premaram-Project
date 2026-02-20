import { create } from 'zustand';
import { getFlow, saveProgress } from '../api/onboardingApi';
import type { Flow, Progress } from '../types';

interface OnboardingState {
  flow: Flow | null;
  progress: Progress | null;
  loading: boolean;
  fetchFlowAndProgress: () => Promise<void>;
  markStepComplete: (stepKey: string, stepPayload?: Record<string, string>) => Promise<boolean>;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  flow: null,
  progress: null,
  loading: false,
  fetchFlowAndProgress: async () => {
    set({ loading: true });
    const { data } = await getFlow();
    set({ flow: data.flow, progress: data.progress, loading: false });
  },
  markStepComplete: async (stepKey, stepPayload = {}) => {
    const state = get();
    if (!state.flow) return false;

    const existing = state.progress;
    const completedStepKeys = [...new Set([...(existing?.completedStepKeys || []), stepKey])];
    const currentIndex = state.flow.steps.findIndex((step) => step.key === stepKey);

    const stepData = {
      ...(existing?.stepData || {}),
      [stepKey]: stepPayload
    };

    const { data } = await saveProgress({
      currentStepIndex: Math.min(currentIndex + 1, state.flow.steps.length - 1),
      completedStepKeys,
      stepData
    });

    set({ progress: data.progress });
    return data.onboardingCompleted;
  }
}));
