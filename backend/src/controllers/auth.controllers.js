import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.js';
import User from '../models/user.models.js';

export const register = asyncHandler(async (req, res,next) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		password,
		dob,
		gender,
    } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender) { 
        return next(new CustomError('Please enter all fields', 400)) ;
	}
	
	// Check if user exists
	const alreadyExists = await User.findOne({ email });
	if (alreadyExists) {
		return next(new CustomError('User already exists', 400));
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

	if(!user){
		return next(new CustomError('Invalid user data', 400));
	}

	res.status(201).json({
		success: true,
		message: 'User registered successfully',
		user,
	});
});
