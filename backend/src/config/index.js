import dotenv from 'dotenv';
dotenv.config();

const config = {
	PORT: process.env.PORT,
	MONGODB_URL: process.env.MONGODB_URL,
	FRONTED_URL: process.env.FRONTED_URL,
	DASHBOARD_URL: process.env.DASHBOARD_URL,

	JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
	JWT_EXPIRES: process.env.JWT_EXPIRES,
	COOKIE_EXPIRES: process.env.COOKIE_EXPIRES,

	CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
	CLOUDINARY_URL: process.env.CLOUDINARY_URL,
};

export default config;
