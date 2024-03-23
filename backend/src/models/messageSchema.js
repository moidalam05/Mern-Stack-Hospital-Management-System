import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			trim: true,
            maxlength: [50, 'First name cannot exceed 50 characters'],
            minlength: [3, 'First name should have at least 3 characters'],
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
			trim: true,
            maxlength: [50, 'Last name cannot exceed 50 characters'],
            minlength: [3, 'Last name should have at least 3 characters'],
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			trim: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please enter a valid email'],
		},
		phone: {
			type: String,
			required: [true, 'Phone is required'],
			trim: true,
			maxlength: [10, 'Phone number should have 10 characters'],
			minlength: [10, 'Phone number should have 10 characters'],
		},
		message: {
			type: String,
			required: [true, 'Message is required'],
			trim: true,
			maxlength: [500, 'Message cannot exceed 500 characters'],
			minlength: [10, 'Message should have at least 10 characters'],
		},
	},
	{ timestamps: true, versionKey: false }
);

export default mongoose.model('Message', messageSchema);
