import { Router } from 'express';
import { createAppointment } from '../controllers/appointment.controller.js';

const router = Router();

router.post('/', createAppointment);

export default router;
