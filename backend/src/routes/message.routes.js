import { Router } from 'express';
import { sendMessage } from '../controllers/message.controllers.js';
import { isMessageValid } from '../middlewares/message.middlewares.js';

const router = Router();

router.post('/', isMessageValid,sendMessage);

export default router;
