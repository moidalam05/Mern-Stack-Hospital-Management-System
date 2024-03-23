import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import Message from '../models/message.models.js';
import validator from 'validator';

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public

export const sendMessage = asyncHandler(async (req, res) => {
	// get the data from the request body or user
	const { firstName, lastName, email, phone, message } = req.body;

	// validate the data
	if (!firstName || !lastName || !email || !phone || !message) {
		throw new CustomError('Please provide all the required fields', 400);
	}

	if (!validator.isEmail(email)) {
		throw new CustomError('Please provide a valid email', 400);
	}
	if (phone.length !== 10) {
		throw new CustomError('Phone number should be 10 digits long', 400);
	}
	if (message.length < 10) {
		throw new CustomError('Message should be at least 10 characters long', 400);
	}
	if (message.length > 500) {
		throw new CustomError('Message should not exceed 500 characters', 400);
	}
	// Create a new message
	const newMessage = await Message.create({
		firstName,
		lastName,
		email,
		phone,
		message,
	});

	res.status(201).json({
		success: true,
		message: 'Message sent successfully',
		newMessage,
	});
});
