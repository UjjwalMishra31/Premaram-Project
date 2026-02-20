import { Router } from 'express';
import { getMyFlow } from '../controllers/flowController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/my-flow', authMiddleware, getMyFlow);

export default router;
