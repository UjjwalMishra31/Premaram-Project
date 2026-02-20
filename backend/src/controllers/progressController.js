import { Flow } from '../models/Flow.js';
import { OnboardingProgress } from '../models/OnboardingProgress.js';
import { User } from '../models/User.js';
import { trackEvent } from '../services/analyticsService.js';
import { getFlowForSegment } from '../services/flowService.js';

const detectActivation = ({ flow, completedStepKeys, stepData }) => {
  if (completedStepKeys.includes(flow.activationStepKey)) return true;

  for (const step of flow.steps) {
    if (step.activationCriteria?.type === 'fieldEquals') {
      const value = stepData?.[step.key]?.[step.activationCriteria.fieldKey];
      if (value && String(value) === String(step.activationCriteria.expectedValue)) {
        return true;
      }
    }
  }

  return false;
};

export const getMyProgress = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const flow = await getFlowForSegment({ startupId: user.startupId, segment: user.segment || 'general' });
  const progress = await OnboardingProgress.findOne({ userId: user._id, flowId: flow._id });

  return res.json({ progress });
};

export const upsertProgress = async (req, res) => {
  const { currentStepIndex, completedStepKeys = [], stepData = {} } = req.body;
  const user = await User.findById(req.user.userId);
  const flow = await getFlowForSegment({ startupId: user.startupId, segment: user.segment || 'general' });

  if (!flow) return res.status(404).json({ message: 'Flow not found' });

  let progress = await OnboardingProgress.findOne({ userId: user._id, flowId: flow._id });
  if (!progress) {
    progress = await OnboardingProgress.create({ userId: user._id, flowId: flow._id });
  }

  const previousSteps = new Set(progress.completedStepKeys);
  const newlyCompleted = completedStepKeys.filter((stepKey) => !previousSteps.has(stepKey));

  progress.currentStepIndex = currentStepIndex ?? progress.currentStepIndex;
  progress.completedStepKeys = [...new Set(completedStepKeys)];
  progress.stepData = { ...Object.fromEntries(progress.stepData), ...stepData };

  const activated = detectActivation({
    flow,
    completedStepKeys: progress.completedStepKeys,
    stepData: progress.stepData
  });

  if (activated && !progress.completedAt) {
    progress.completedAt = new Date();
    user.onboardingCompleted = true;
    user.activatedAt = new Date();
    await trackEvent({
      startupId: user.startupId,
      userId: user._id,
      flowId: flow._id,
      eventType: 'activation_completed'
    });
  }

  await progress.save();
  await user.save();

  for (const stepKey of newlyCompleted) {
    await trackEvent({
      startupId: user.startupId,
      userId: user._id,
      flowId: flow._id,
      eventType: 'step_completed',
      stepKey
    });
  }

  if (progress.completedAt) {
    await trackEvent({
      startupId: user.startupId,
      userId: user._id,
      flowId: flow._id,
      eventType: 'onboarding_completed'
    });
  }

  return res.json({ progress, onboardingCompleted: user.onboardingCompleted });
};
