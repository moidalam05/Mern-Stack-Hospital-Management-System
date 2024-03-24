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
	const user = await User.findOne({ email });
	if (user) {
		throw new CustomError('User already exists', 400);
	}

	// create user
	await User.create({
		firstName,
		lastName,
		email,
		phone,
		password,
		role,
		dob,
		gender,
	});

	// send response
	res.status(201).json({
		success: true,
		message: 'User registered successfully',
	});
});


// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public

export const login = asyncHandler(async (req, res) => { 
	const { email, password, role } = req.body;
	
	// check all fields are filled
	if (!email || !password || !role) {
		throw new CustomError('Please fill all fields', 400);
	}

	// validate provided data
	if (!validator.isEmail(email)) {
		throw new CustomError('Please enter a valid email', 400);
	}

	// check if password is correct
	if(password.length < 8) {
		throw new CustomError('Password should have at least 8 characters', 400);
	}

	// find user
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new CustomError('Invalid email or password', 404);
	}

	// password is correct
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		throw new CustomError('Password do not match!', 401);
	}

	// create token
	const token = user.generateJwtToken();
	// remove password from response
	user.password = undefined;

	// send response
	res.status(200).json({
		success: true,
		message: 'User logged in successfully',
		user,
		token,
	});
});