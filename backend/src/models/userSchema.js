import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const userSchema = new mongoose.Schema(
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
			unique: true,
		},
		phone: {
			type: String,
			required: [true, 'Phone is required'],
			trim: true,
			maxlength: [10, 'Phone number should have 10 characters'],
			minlength: [10, 'Phone number should have 10 characters'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			trim: true,
			minlength: [8, 'Password should have at least 8 characters'],
			select: false,
		},
		role: {
			type: String,
			enum: ['Patient', 'Admin', 'Doctor'],
			required: [true, 'Role is required'],
		},
		doctorDepartment: {
			type: String,
		},
		dob: {
			type: Date,
			required: [true, 'Date of birth is required'],
		},
		gender: {
			type: String,
			enum: ['Male', 'Female', 'Other'],
		},
		docAvatar: {
			image_url: String,
			public_id: String,
		},
	},
	{ timestamps: true, versionKey: false }
);

// Encrypt password before saving user
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Compare user password
userSchema.methods = {
	comparePassword: async function (enteredPassword) {
		return await bcrypt.compare(enteredPassword, this.password);
	},

	// Generate password token
	generateJwtToken: function () {
		return jwt.sign({ id: this._id }, config.JWT_SECRET_KEY, {
			expiresIn: config.JWT_EXPIRES,
		});
	},
};

export default mongoose.model('User', userSchema);
