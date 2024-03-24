import { Router } from 'express';
import { deleteMessage, getMessages, sendMessage } from '../controllers/message.controller.js';
import {
	isAdminLoggedIn,
	isPatientLoggedIn,
} from '../middlewares/authentication.js';

const router = Router();

router.post('/', sendMessage);
router.get('/all', isAdminLoggedIn, getMessages);
router.delete('/:id', isAdminLoggedIn, deleteMessage);

export default router;
