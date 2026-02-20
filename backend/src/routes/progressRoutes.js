import { Router } from 'express';
import { getMyProgress, upsertProgress } from '../controllers/progressController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me', authMiddleware, getMyProgress);
router.put('/me', authMiddleware, upsertProgress);

export default router;
