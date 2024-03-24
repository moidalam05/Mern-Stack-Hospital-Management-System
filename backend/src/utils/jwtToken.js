import config from '../config/index.js';

export const generateToken = (user, message, statusCode, res) => {
	const token = user.generateJwtToken();
	const cookieName = user.role === 'Admin' ? 'adminToken' : 'PatientToken';
	res
		.status(statusCode)
		.cookie(cookieName, token, {
			expires: new Date(
				Date.now() + config.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
			),
			httpOnly: true,
			secure: true,
		})
		.json({
			success: true,
			message,
			user,
			token,
		});
};
