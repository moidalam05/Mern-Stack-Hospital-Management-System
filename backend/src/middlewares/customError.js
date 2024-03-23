class CustomError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default CustomError;

export const errorHandler = (err, req, res, next) => {
	err.message = err.message || 'Internal Server Error';
	err.statusCode = err.statusCode || 500;

	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
		err = new CustomError(message, 400);
	}

	if (err.name === 'jsonWebTokenError') {
		const message = 'Invalid json web token';
		err = new CustomError(message, 400);
	}

	if (err.name === 'TokenExpiredError') {
		const message = 'Json web token expired';
		err = new CustomError(message, 400);
	}

	if (err.name === 'CastError') {
		const message = `Resource not found! invalid ${err.path}`;
		err = new CustomError(message, 404);
	}

	if (err.name === 'syntaxError') {
		const message = 'Syntax error in query';
		err = new CustomError(message, 400);
	}

	return res.status(err.statusCode).json({
		success: false,
		error: err.message,
	});
};
