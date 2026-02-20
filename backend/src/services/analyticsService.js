import { AnalyticsEvent } from '../models/AnalyticsEvent.js';
import { OnboardingProgress } from '../models/OnboardingProgress.js';

export const trackEvent = async ({ startupId, userId, flowId, eventType, stepKey, metadata = {} }) => {
  return AnalyticsEvent.create({ startupId, userId, flowId, eventType, stepKey, metadata });
};

export const getAnalyticsSummary = async (startupId = 'default_startup') => {
  const stepCompletionRaw = await AnalyticsEvent.aggregate([
    { $match: { startupId, eventType: 'step_completed' } },
    { $group: { _id: '$stepKey', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);

  const dropOffRaw = await OnboardingProgress.aggregate([
    { $match: { completedAt: null } },
    { $group: { _id: '$currentStepIndex', users: { $sum: 1 } } },
    { $sort: { users: -1 } },
    { $limit: 1 }
  ]);

  const activationRaw = await OnboardingProgress.aggregate([
    { $match: { completedAt: { $ne: null } } },
    {
      $project: {
        ms: { $subtract: ['$completedAt', '$startedAt'] }
      }
    },
    {
      $group: {
        _id: null,
        avgMs: { $avg: '$ms' }
      }
    }
  ]);

  return {
    stepCompletionRate: stepCompletionRaw,
    dropOffStep: dropOffRaw[0]?._id ?? null,
    averageTimeToActivationMs: Math.round(activationRaw[0]?.avgMs ?? 0)
  };
};
