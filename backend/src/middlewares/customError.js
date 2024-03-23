class CustomError extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;
	}
}

export default CustomError;

export const errorHandler = (err, req, res, next) => {
	err.message = err.message || 'Internal Server Error';
	err.code = err.code || 500;

	if (err.code === 11000) {
		const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
		throw new CustomError(message, 400);
	}

	if (err.name === 'jsonWebTokenError') {
		const message = 'Invalid json web token';
		throw new CustomError(message, 400);
	}

	if (err.name === 'TokenExpiredError') {
		const message = 'Json web token expired';
		throw new CustomError(message, 400);
	}

	if (err.name === 'CastError') {
		const message = `Resource not found! invalid ${err.path}`;
		throw new CustomError(message, 404);
	}

	if (err.name === 'syntaxError') {
		const message = 'Syntax error in query';
		throw new CustomError(message, 400);
	}

	const errorMessage = err.errors
		? Object.values(err.errors)
				.map((error) => error.message)
				.join('\n')
		: err.message;

	res.status(err.code).json({
		success: false,
		error: errorMessage,
	});
};
