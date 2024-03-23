import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please enter your fisrt name'],
			trim: true,
			maxLength: [50, 'Your first name cannot exceed 50 characters'],
		},
		lastName: {
			type: String,
			required: [true, 'Please enter your last name'],
			trim: true,
			maxLength: [50, 'Your last name cannot exceed 50 characters'],
		},
		username: {
			type: String,
			required: [true, 'Please enter your username'],
			trim: true,
			unique: true,
			minLength: [3, 'Username must be at least 3 characters long'],
		},
		email: {
			type: String,
			required: [true, 'Please enter your email'],
			unique: true,
			trim: true,
			validate: [validator.isEmail, 'Please enter a valid email'],
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
			trim: true,
			minLength: [8, 'Password must be at least 8 characters long'],
			select: false,
		},
		dob: {
			type: Date,
			required: [true, 'Please enter your date of birth'],
		},
		gender: {
			type: String,
			required: [true, 'Please enter your gender'],
			enum: ['Male', 'Female', 'Other'],
		},
		doctorAvatar: {
			url: String,
			public_id: String,
		},
		role: {
			type: String,
			enum: ['Patient', 'Admin', 'Doctor'],
			default: 'user',
			required: true,
		},
		doctorDepartment: {
			type: String,
		},
	},
	{ timestamps: true, versionKey: false }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
	// Compare user password
	comparePassword: async function (enteredPassword) {
		return await bcrypt.compare(enteredPassword, this.password);
	},

	// Generate JWT token
	generateToken: function () {
		return jwt.sign({ id: this._id }, config.JWT_SECRET_KEY, {
			expiresIn: config.JWT_EXPIRES,
		});
	},
};

export default mongoose.model('User', userSchema);
