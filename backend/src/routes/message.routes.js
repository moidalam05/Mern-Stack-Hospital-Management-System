import { Router } from 'express';
import { sendMessage } from '../controllers/message.controllers.js';
import { messageError } from '../middlewares/message.middlewares.js';

const router = Router();

router.post('/', messageError, sendMessage);

export default router;
