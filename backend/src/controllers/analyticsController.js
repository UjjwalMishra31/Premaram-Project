import { getAnalyticsSummary } from '../services/analyticsService.js';

export const getAnalytics = async (req, res) => {
  const startupId = req.query.startupId || 'default_startup';
  const summary = await getAnalyticsSummary(startupId);
  return res.json(summary);
};
