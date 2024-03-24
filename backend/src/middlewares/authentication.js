import asyncHandler from './asyncHandler.js';
import CustomError from './customError.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../models/userSchema.js';

export const isAdminLoggedIn = asyncHandler(async (req, res, next) => {
	const token = req.cookies.AdminToken;
	if (!token) {
		throw new CustomError('Admin Not authorized to access this route', 401);
	}

	const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
	req.user = await User.findById(decoded.id);
	if (req.user.role !== 'Admin') {
		throw new CustomError(
			`${req.user.role} not authorized for this resource!`,
			403
		);
	}
	next();
});

export const isPatientLoggedIn = asyncHandler(async (req, res, next) => {
	const token = req.cookies.PatientToken;
	if (!token) {
		throw new CustomError('Patient Not authorized to access this route', 401);
	}

	const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
	req.user = await User.findById(decoded.id);
	if (!req.user.role === 'Patient') {
		throw new CustomError(
			`${req.user.role} not authorized for this resource!`,
			403
		);
	}
	next();
});
