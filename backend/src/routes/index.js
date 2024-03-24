import { Router } from 'express';
import messageRouter from './message.route.js';
import authRouter from './auth.route.js';
import appointmentRouter from './appointment.route.js';
const router = Router();

router.use('/message', messageRouter);
router.use('/auth', authRouter);
router.use('/appointment', appointmentRouter);

export default router;
