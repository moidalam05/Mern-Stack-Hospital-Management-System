import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../middlewares/customError.js';
import Appointment from '../models/appointmentSchema.js';
import User from '../models/userSchema.js';
import validator from 'validator';

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Public

export const createAppointment = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		dob,
		gender,
		appointmentDate,
		department,
		doctor_firstName,
		doctor_lastName,
		hasVisisted,
		address,
	} = req.body;

	// check all fields are filled
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!dob ||
		!gender ||
		!appointmentDate ||
		!department ||
		!doctor_firstName ||
		!doctor_lastName ||
		!address
	) {
		throw new CustomError('Please fill in all fields', 400);
	}

	// validate all data
	if (!validator.isEmail(email)) {
		throw new CustomError('Please enter a valid email', 400);
	}

	if (phone.length !== 10) {
		throw new CustomError('Phone number should have 10 characters', 400);
	}

	const isConflict = await User.find({
		firstName: doctor_firstName,
		lastName: doctor_lastName,
		role: 'Doctor',
		doctorDepartment: department,
	});

	if (!isConflict || isConflict.length === 0) {
		throw new CustomError('Doctor not found', 404);
	}

	if (isConflict.length > 1) {
		throw new CustomError(
			'Doctor conflict! Please contact through Email or Phone',
			400
		);
	}

	const doctorId = isConflict[0]._id;
	const patientId = req.user._id;

	const appointment = await Appointment.create({
		firstName,
		lastName,
		email,
		phone,
		dob,
		gender,
		appointmentDate,
		department,
		doctor: {
			firstName: doctor_firstName,
			lastName: doctor_lastName,
		},
		hasVisisted,
		address,
		doctorId,
		patientId,
	});

	res.status(201).json({
		success: true,
		message: 'Appointment sent successfully',
		appointment,
	});
});
