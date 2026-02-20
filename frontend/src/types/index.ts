export type StepType = 'info' | 'form' | 'action' | 'checklist';

export interface FlowStep {
  key: string;
  title: string;
  description: string;
  type: StepType;
  fields?: Array<{ key: string; label: string; inputType: string; required: boolean }>;
  checklistItems?: string[];
}

export interface Flow {
  _id: string;
  name: string;
  activationStepKey: string;
  steps: FlowStep[];
}

export interface Progress {
  _id: string;
  currentStepIndex: number;
  completedStepKeys: string[];
  stepData: Record<string, Record<string, string>>;
  completedAt: string | null;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string | null;
  goal: string | null;
  segment: string | null;
  onboardingCompleted: boolean;
}
