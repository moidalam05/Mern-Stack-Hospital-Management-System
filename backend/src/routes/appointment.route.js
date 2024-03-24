import { Router } from 'express';
import {
	createAppointment,
	deleteAppointment,
	getAppointments,
	updateAppointmentStatus,
} from '../controllers/appointment.controller.js';
import {
	isPatientLoggedIn,
	isAdminLoggedIn,
} from '../middlewares/authentication.js';

const router = Router();

router.post('/', isPatientLoggedIn, createAppointment);
router.get('/all', isAdminLoggedIn, getAppointments);
router.put('/:id', isAdminLoggedIn, updateAppointmentStatus);
router.delete('/:id', isAdminLoggedIn, deleteAppointment);

export default router;
