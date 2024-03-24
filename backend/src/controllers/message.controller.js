import asyncHandler from '../middlewares/asyncHandler.js';
import CustomError from '../middlewares/customError.js';
import Message from '../models/messageSchema.js';

// @desc    Send a message
// @route   POST /api/messages
// @access  Public

export const sendMessage = asyncHandler(async (req, res) => {
	// Get the data from the request body
	const { firstName, lastName, email, phone, message } = req.body;

	// Check if all fields are filled
	if (!firstName || !lastName || !email || !phone || !message) {
		throw new CustomError('Please fill in all fields', 400);
	}

	// Check if the email is valid
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw new CustomError('Please enter a valid email address', 400);
	}

	// Check if the phone number is valid
	const phoneRegex = /^\d{10}$/;
	if (!phoneRegex.test(phone)) {
		throw new CustomError('Please enter a valid phone number', 400);
	}

	// Check if the message is too long
	if (message.length > 500) {
		throw new CustomError('Message is too long', 400);
	}

	// Check if the message is too short
	if (message.length < 10) {
		throw new CustomError('Message is too short', 400);
	}

	// Check if the first name is too long
	if (firstName.length > 50) {
		throw new CustomError('First name is too long', 400);
	}

	// Check if the last name is too long
	if (lastName.length > 50) {
		throw new CustomError('Last name is too long', 400);
	}

	// Check if the phone is too long or too short
	if (phone.length < 10 || phone.length > 10) {
		throw new CustomError('Phone number must be 10 digits long', 400);
	}

	// Create a new message
	await Message.create({
		firstName,
		lastName,
		email,
		phone,
		message,
	});

	// Send a response
	res.status(201).json({
		success: true,
		message: 'Message sent successfully',
	});
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Public

export const getMessages = asyncHandler(async (req, res) => {
	const messages = await Message.find();
	res.status(200).json({
		success: true,
		messages,
	});
});

// @desc    delete a message
// @route   DELETE /api/messages/:id
// @access  Public

export const deleteMessage = asyncHandler(async (req, res) => {
	const message = await Message.findByIdAndDelete(req.params.id);
	if (!message) {
		throw new CustomError('Message not found', 404);
	}
	res.status(200).json({
		success: true,
		message: 'Message deleted successfully',
	});
});
