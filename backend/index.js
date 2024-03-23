import mongoose from 'mongoose';
import app from './src/app.js';
import config from './src/config/index.js';
import cloudinary from 'cloudinary';

// Configure cloudinary
cloudinary.v2.config({
	cloud_name: config.CLOUDINARY_CLOUD_NAME,
	api_key: config.CLOUDINARY_API_KEY,
	api_secret: config.CLOUDINARY_API_SECRET,
});

// Connect to the database and start the server
(async () => {
	try {
		await mongoose.connect(config.MONGODB_URL);
		console.log('Database connected successfully');

		app.on('error', (err) => {
			console.log(err);
			throw err;
		});

		const onListening = () => {
			console.log(`Server is running on port ${config.PORT} `);
		};
		app.listen(config.PORT, onListening);
	} catch (error) {
		console.log('ERROR: ', error);
		throw error;
	}
})();
