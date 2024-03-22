import { Router } from 'express';
import { sendMessage } from '../controllers/message.controller.js';
const router = Router();

router.post('/', sendMessage);

export default router;
