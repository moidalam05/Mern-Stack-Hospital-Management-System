import asyncHandler from '../utils/AsyncHandler';
import CustomError from '../utils/CustomError';
import Message from '../models/Message';

// @desc    Create a new message
// @route   POST /api/messages
// @access  Public

export const sendMessage = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, phone, message } = req.body;

	if (!firstName || !lastName || !email || !phone || !message) {
		throw new CustomError('Please fill in all fields', 400);
	}

	const newMessage = await Message.create({
		firstName,
		lastName,
		email,
		phone,
		message,
	});

	if (!newMessage) {
		throw new CustomError('Message could not be sent', 400);
	}

	res.status(201).json({
		success: true,
		message: 'Message sent successfully',
		newMessage,
	});
});
