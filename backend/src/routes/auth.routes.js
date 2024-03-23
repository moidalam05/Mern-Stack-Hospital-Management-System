import { Router } from 'express';
import { register } from '../controllers/auth.controllers.js';
import { authError } from '../middlewares/auth.middlewares.js';

const router = Router();

router.post('/register', authError, register);

export default router;
