import { Router } from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/summary', authMiddleware, getAnalytics);

export default router;
