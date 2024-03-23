import { Router } from 'express';
import { sendMessage } from '../controllers/message.controllers.js';

const router = Router();

router.post('/', sendMessage);

export default router;
