import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import validator from 'validator';

export const isMessageValid = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, phone, message } = req.body;

	if (!firstName || !lastName || !email || !phone || !message) {
		throw new CustomError('Please fill in all fields', 400);
	}

	if (!/^[a-zA-Z\s]+$/.test(firstName)) {
		throw new CustomError(
			'First name must contain only alphabetic characters',
			400
		);
	}

	if (!/^[a-zA-Z\s]+$/.test(lastName)) {
		throw new CustomError(
			'Last name must contain only alphabetic characters',
			400
		);
	}

	if (!/[a-zA-Z]/.test(message)) {
		throw new CustomError(
			'Message must contain at least one alphabetic character',
			400
		);
	}

	if (!validator.isEmail(email)) {
		throw new CustomError('Please provide a valid email address', 400);
	}

	if (phone.length !== 10) {
		throw new CustomError('Phone number must be 10 digits long', 400);
	}
	if (!/^\d+$/.test(phone)) {
		throw new CustomError('Phone number must contain only numbers', 400);
	}

	if (message.length < 10) {
		throw new CustomError('Message must be at least 10 characters long', 400);
	}
	next();
});
