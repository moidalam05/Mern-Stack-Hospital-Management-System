import { Router } from 'express';
import { createAppointment } from '../controllers/appointment.controller.js';
import {isPatientLoggedIn,isAdminLoggedIn} from '../middlewares/authentication.js';

const router = Router();

router.post('/',isPatientLoggedIn, createAppointment);

export default router;
