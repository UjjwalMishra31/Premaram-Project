import { User } from '../models/User.js';
import { resolveSegment } from '../services/segmentService.js';

export const updateProfile = async (req, res) => {
  const { role, goal } = req.body;
  const segment = resolveSegment({ role, goal });

  const user = await User.findByIdAndUpdate(
    req.user.userId,
    { role, goal, segment },
    { new: true }
  ).select('-passwordHash');

  return res.json({ user });
};
