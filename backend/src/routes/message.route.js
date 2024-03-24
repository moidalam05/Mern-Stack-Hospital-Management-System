import { Router } from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import {
	isAdminLoggedIn,
	isPatientLoggedIn,
} from '../middlewares/authentication.js';

const router = Router();

router.post('/', sendMessage);
router.get('/all', isAdminLoggedIn, getMessages);

export default router;
