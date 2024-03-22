import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import app from './src/app.js';
import config from './src/config/index.js';

cloudinary.v2.config({
	cloud_name: config.CLOUDINARTY_NAME,
	api_key: config.CLOUDINARTY_API_KEY,
	api_secret: config.CLOUDINARTY_API_SECRET,
});

(async () => {
	try {
		await mongoose.connect(config.MONGODB_URL);
		console.log('MongoDB connected...');

		app.on('error', (err) => {
			console.log(err);
			throw err;
		});

		const onListening = () => {
			console.log(`Listening on port ${config.PORT}`);
		};

		app.listen(config.PORT, onListening);
	} catch (error) {
		console.log('ERROR: ', err);
		throw err;
	}
})();
