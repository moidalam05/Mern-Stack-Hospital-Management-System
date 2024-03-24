import { Router } from 'express';
import messageRouter from './message.route.js';
import authRouter from './auth.route.js';
const router = Router();

router.use('/message', messageRouter);
router.use('/auth', authRouter);

export default router;