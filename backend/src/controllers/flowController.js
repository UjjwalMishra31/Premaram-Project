import { OnboardingProgress } from '../models/OnboardingProgress.js';
import { User } from '../models/User.js';
import { getFlowForSegment } from '../services/flowService.js';

export const getMyFlow = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const flow = await getFlowForSegment({ startupId: user.startupId, segment: user.segment || 'general' });
  if (!flow) return res.status(404).json({ message: 'No onboarding flow configured' });

  const progress = await OnboardingProgress.findOne({ userId: user._id, flowId: flow._id });

  return res.json({ flow, progress });
};
