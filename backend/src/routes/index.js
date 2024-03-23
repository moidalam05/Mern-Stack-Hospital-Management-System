import { Router } from 'express';
import messageRoutes from './message.routes.js';
import authRoutes from './auth.routes.js';
const router = Router();

router.use('/message', messageRoutes);
router.use('/auth',authRoutes)

export default router;
