import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import User from '../models/user.models.js';
import validator from 'validator';

export const cookieOptions = {
	expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
	httpOnly: true,
};

/*******************************************************
 * @SIGNUP
 * @route http://localhost:5000/api/v1/auth/signup
 * @description Signup a new user
 * @returns {Object} - user, token
 *******************************************************/

export const register = asyncHandler(async (req, res) => {
	// get the data from the request body or user
	const { firstName, lastName, email, phone, password, dob, gender } = req.body;

	// validate the data
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!password ||
		!dob ||
		!gender
	) {
		throw new CustomError('Please provide all the required fields', 400);
	}
	if (password.length < 8) {
		throw new CustomError('Password should be at least 8 characters long', 400);
	}
	if (!validator.isEmail(email)) {
		throw new CustomError('Please provide a valid email', 400);
	}
	if (phone.length !== 10) {
		throw new CustomError('Phone number should be 10 digits long', 400);
	}
	// check if user already exists
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new CustomError('User already exists', 400);
	}
	// Create user in database
	const user = await User.create({
		firstName,
		lastName,
		email,
		phone,
		password,
		dob,
		gender,
	});

	// generate token
	const token = user.generateToken();
	user.password = undefined;

	// store the token in the user's cookie
	res.cookie('token', token, cookieOptions);

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user,
		token,
	});
});

/*******************************************************
 * @SIGNIN
 * @route http://localhost:5000/api/v1/auth/signin
 * @description Signin the user
 * @returns {Object} - user, token
 *******************************************************/

export const login = asyncHandler(async (req, res) => {
	// get the data from the request body or user
	const { email, password } = req.body;

	// validate the data
	if (!email || !password) {
		throw new CustomError('Please provide all the required fields', 400);
	}
	if (!validator.isEmail(email)) {
		throw new CustomError('Please provide a valid email', 400);
	}
	if (password.length < 8) {
		throw new CustomError('Password should be at least 8 characters long', 400);
	}

	// check if user exists
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		throw new CustomError('Invalid email or password', 401);
	}

	// check if password matches
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		throw new CustomError('Password is not correct !', 401);
	}

	// generate token
	const token = user.generateToken();
	user.password = undefined;

	// store the token in the user's cookie
	res.cookie('token', token, cookieOptions);

	res.status(200).json({
		success: true,
		message: 'User logged in successfully',
		user,
		token,
	});
});

/*******************************************************
 * @SIGNOUT
 * @route http://localhost:5000/api/v1/auth/signout
 * @description Signout the user
 * @returns {Object} - message
 *******************************************************/

export const logout = asyncHandler(async (req, res) => {
	// clear the cookie
	res.cookie('token', null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res
		.status(200)
		.json({ success: true, message: 'User logged out successfully' });
});

/*******************************************************
 * @GET_PROFILE
 * @route http://localhost:5000/api/v1/auth/getProfile
 * @description getProfile of the user
 * @returns {Object} - user
 *******************************************************/

export const getProfile = asyncHandler(async (req, res) => { 
	const { user } = req;
	if (!user) {
		throw new CustomError('User not found', 404);
	}
	res.status(200).json({ success: true, user });
});