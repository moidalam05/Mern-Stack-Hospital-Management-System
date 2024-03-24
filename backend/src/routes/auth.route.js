import { Router } from 'express';
import { register, login, logout,adminRegister } from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/register', adminRegister);
router.get('/logout', logout);

export default router;
