import { Router } from 'express';
import messageRouter from './message.route.js';
const router = Router();

router.use('/message',messageRouter);

export default router;