import CustomError from '../utils/customError.js';
import asyncHanlder from '../utils/asyncHandler.js';

export const messageError = asyncHanlder(async (req, res, next) => {
	const { firstName, lastName, email, phone, message } = req.body;
	// Check if all fields are filled
	if (!firstName || !lastName || !email || !phone || !message) {
		return next(new CustomError('Please fill all fields', 400));
	}

	// Check if email is valid
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return next(new CustomError('Please enter a valid email', 400));
	}

	// Check if phone number is valid
	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(phone)) {
		return next(new CustomError('Please enter a valid phone number', 400));
	}

	// Check if message is valid
	if (message.length < 10) {
		return next(new CustomError('Message must be at least 10 characters', 400));
	}

	// Check if message is too long
	if (message.length > 500) {
		return next(new CustomError('Message must be at most 500 characters', 400));
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

	// message type check
	if (!/[a-zA-Z]/.test(message)) {
		return next(
			new CustomError(
				'Message must contain at least one alphabetic character',
				400
			)
		);
	}

	// phone number range check
	if (!/^\d+$/.test(phone)) {
		return next(new CustomError('Phone number must contain only numbers', 400));
	}
	next();
});
