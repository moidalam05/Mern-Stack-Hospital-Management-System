import CustomError from '../middlewares/customError.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userSchema.js';
import validator from 'validator';

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public

export const cookieOptions = {
	expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
	httpOnly: true,
};

export const register = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		password,
		role,
		dob,
		gender,
	} = req.body;

	// check all fields are filled
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!password ||
		!role ||
		!dob ||
		!gender
	) {
		throw new CustomError('Please fill all fields', 400);
	}

	// validate provided data
	if (password.length < 8) {
		throw new CustomError('Password should have at least 8 characters', 400);
	}

	if (phone.length !== 10) {
		throw new CustomError('Phone number should have 10 characters', 400);
	}

	if (!validator.isEmail(email)) {
		throw new CustomError('Please enter a valid email', 400);
	}

	// check if user already exists
	const alreadyExists = await User.findOne({ email });
	if (alreadyExists) {
		throw new CustomError('User already exists', 400);
	}

	// create user
	const user = await User.create({
		firstName,
		lastName,
		email,
		phone,
		password,
		role,
		dob,
		gender,
	});

	// create token
	const token = user.generateJwtToken();
	// remove password from response
	user.password = undefined;

	// send response
	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user,
		token,
	});
});
