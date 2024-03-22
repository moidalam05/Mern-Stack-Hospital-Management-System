import { Router } from 'express';
import messageRoutes from './message.routes.js';
const router = Router();

router.use('/message', messageRoutes);

export default router;
