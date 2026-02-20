import { Router } from 'express';
import { updateProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.patch('/profile', authMiddleware, updateProfile);

export default router;
