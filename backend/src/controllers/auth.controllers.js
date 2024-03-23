import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.js';
import User from '../models/user.models.js';

export const cookieOptions = {
	expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
	httpOnly: true,
};

export const register = asyncHandler(async (req, res, next) => {
	const { firstName, lastName, email, phone, password, dob, gender } = req.body;

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

	if (!user) {
		return next(new CustomError('Invalid user data', 400));
	}

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user,
		token,
	});
});
