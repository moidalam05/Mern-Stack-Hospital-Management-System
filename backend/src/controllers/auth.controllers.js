import asyncHandler from '../utils/asyncHandler.js';
import CustomError from '../utils/customError.js';
import User from '../models/user.model.js';

export const register = asyncHandler(async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		phone,
		password,
		dob,
		gender,
		role,
    } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !password || !dob || !gender || !role) { 
        throw new CustomError('Please enter all fields', 400);
    }
	// Check if user exists
	const userExists = await User.findOne({ email: email });
});
