import { Router } from 'express';
import {
	register,
	login,
	adminRegister,
	getDoctors,
	getUserDetails,
	logoutAdmin,
	logoutPatient,
	addDoctor,
} from '../controllers/auth.controller.js';
import {
	isAdminLoggedIn,
	isPatientLoggedIn,
} from '../middlewares/authentication.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/register', isAdminLoggedIn, adminRegister);
router.get('/doctor', getDoctors);
router.get('/patient/me', isPatientLoggedIn, getUserDetails);
router.get('/admin/me', isAdminLoggedIn, getUserDetails);
router.get('/admin/logout', isAdminLoggedIn, logoutAdmin);
router.get('/patient/logout', isPatientLoggedIn, logoutPatient);
router.post('/doctor/register', isAdminLoggedIn, addDoctor);

export default router;
