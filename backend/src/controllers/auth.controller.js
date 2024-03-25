import CustomError from '../middlewares/customError.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userSchema.js';
import { generateToken } from '../utils/jwtToken.js';
import validator from 'validator';
import cloudinary from 'cloudinary';

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public

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
	let user = await User.findOne({ email });
	if (user) {
		throw new CustomError(`${user.role} already exists with same email!`, 400);
	}

	// create user
	user = await User.create({
		firstName,
		lastName,
		email,
		phone,
		password,
		role,
		dob,
		gender,
	});

	// remove password from response
	user.password = undefined;

	// create token send response
	generateToken(user, 'User registered successfully', 201, res);
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
	if (password.length < 8) {
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

	// check user role
	if (user.role !== role) {
		throw new CustomError('You are not authorized!', 401);
	}

	// remove password from response
	user.password = undefined;

	// create token send response
	generateToken(user, 'User logged in successfully', 200, res);
});

// @desc admin register
// @route POST /api/v1/auth/admin/register
// @access Public

export const adminRegister = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, phone, password, dob, gender } = req.body;

	// check all fields are filled
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!password ||
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
	let admin = await User.findOne({ email });
	if (admin) {
		throw new CustomError(`${admin.role} already exists with same email!`, 400);
	}

	// create admin
	admin = await User.create({
		firstName,
		lastName,
		email,
		phone,
		password,
		dob,
		gender,
		role: 'Admin',
	});

	// remove password from response
	admin.password = undefined;

	// create token send response
	generateToken(admin, 'Admin registered successfully', 201, res);
});

// @desc    get all doctors
// @route   GET /api/v1/auth/doctors
// @access  Private

export const getDoctors = asyncHandler(async (req, res) => {
	const doctors = await User.find({ role: 'Doctor' });
	res.status(200).json({
		success: true,
		doctors,
	});
});

// @desc    get user details
// @route   GET /api/v1/auth/user
// @access  Private

export const getUserDetails = asyncHandler(async (req, res) => {
	const user = req.user;
	res.status(200).json({
		success: true,
		user,
	});
});

// @desc    Logout admin
// @route   GET /api/v1/auth/logout
// @access  Private

export const logoutAdmin = asyncHandler(async (req, res) => {
	res
		.status(200)
		.cookie('AdminToken', '', {
			expires: new Date(Date.now()),
			httpOnly: true,
		})
		.json({
			success: true,
			message: 'User logged out successfully',
		});
});

// @desc    Logout patient
// @route   GET /api/v1/auth/logout
// @access  Private

export const logoutPatient = asyncHandler(async (req, res) => {
	res
		.status(200)
		.cookie('PatientToken', '', {
			expires: new Date(Date.now()),
			httpOnly: true,
		})
		.json({
			success: true,
			message: 'User logged out successfully',
		});
});

// @desc    add new doctor
// @route   POST /api/v1/auth/doctor
// @access  Private

export const addDoctor = asyncHandler(async (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		throw new CustomError('Please upload a doctor avatar', 400);
	}

	const { docAvatar } = req.files;
	const allowedFormats = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/gif',
		'image/webp',
	];

	if (!allowedFormats.includes(docAvatar.mimetype)) {
		throw new CustomError('Please upload an image file only', 400);
	}

	const {
		firstName,
		lastName,
		email,
		phone,
		password,
		gender,
		dob,
		doctorDepartment,
	} = req.body;

	// check all fields are filled
	if (
		!firstName ||
		!lastName ||
		!email ||
		!phone ||
		!password ||
		!gender ||
		!dob ||
		!doctorDepartment
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
	let doctor = await User.findOne({ email });
	if (doctor) {
		throw new CustomError('Doctor already exists with same email!', 400);
	}

	// upload avatar
	const cloudinaryResponse = await cloudinary.uploader.upload(
		docAvatar.tempFilePath
	);
	if (!cloudinaryResponse || cloudinaryResponse.error) {
		console.log(`Error uploading image: ${cloudinaryResponse.error}`);
		throw new CustomError('Error uploading image', 500);
	}

	// create doctor
	doctor = await User.create({
		firstName,
		lastName,
		email,
		phone,
		password,
		gender,
		dob,
		doctorDepartment,
		docAvatar: {
			public_id: cloudinaryResponse.public_id,
			image_url: cloudinaryResponse.secure_url,
		},
		role: 'Doctor',
	});

	// remove password from response
	doctor.password = undefined;

	// send response
	res.status(201).json({
		success: true,
		message: 'Doctor added successfully',
		doctor,
	});
});
