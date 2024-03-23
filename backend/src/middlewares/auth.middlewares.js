import CustomError from '../utils/CustomError.js';
import asyncHanlder from '../utils/asyncHandler.js';
import User from '../models/user.models.js';

export const authError = asyncHanlder(async (req, res, next) => {
	const { firstName, lastName, email, phone, password, dob, gender } = req.body;

	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!password ||
		!dob ||
		!gender
	) {
		return next(new CustomError('Please enter all fields', 400));
	}

	// Check if email is valid
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return next(new CustomError('Please enter a valid email', 400));
	}

	// name type check
	if (!/^[a-zA-Z\s]+$/.test(firstName)) {
		return next(
			new CustomError('First name must contain only alphabetic characters', 400)
		);
	}

	if (!/^[a-zA-Z\s]+$/.test(lastName)) {
		return next(
			new CustomError('Last name must contain only alphabetic characters', 400)
		);
	}

	// Check if phone number is valid
	if (!/^\d+$/.test(phone)) {
		return next(new CustomError('Phone number must contain only numbers', 400));
	}

	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(phone)) {
		return next(new CustomError('Please enter a valid phone number', 400));
	}

	// password length check
	if (password.length < 8) {
		return next(new CustomError('Password must be at least 8 characters', 400));
	}

	// Check if user exists
	const alreadyExists = await User.findOne({ email });
	if (alreadyExists) {
		return next(new CustomError('User already exists', 400));
	}
	next();
});
