import mongoose from 'mongoose';
import app from './src/app.js';
import config from './src/config/index.js';

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