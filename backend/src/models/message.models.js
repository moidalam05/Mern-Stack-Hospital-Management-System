import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please enter your first name'],
			trim: true,
			minLength: [3, 'First name must be at least 3 characters long'],
		},
		lastName: {
			type: String,
			required: [true, 'Please enter your last name'],
			trim: true,
			minLength: [3, 'Last name must be at least 3 characters long'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			validate: [validator.isEmail, 'Please enter a valid email'],
			trim: true,
		},
		phone: {
			type: String,
			required: [true, 'Please enter your phone number'],
			maxlength: [10, 'Phone number must be 10 characters long'],
			minlength: [10, 'Phone number must be 10 characters long'],
		},
		message: {
			type: String,
			required: [true, 'Please enter your message'],
			trim: true,
			minLength: [10, 'Message must be at least 10 characters long'],
			maxLength: [500, 'Message must be at most 500 characters long'],
		},
	},
	{ timestamps: true, versionKey: false }
);

export default mongoose.model('Message', messageSchema);
