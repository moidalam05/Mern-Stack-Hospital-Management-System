import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import config from './config/index.js';
import fileUpload from 'express-fileupload';
import { errorHandler } from './utils/customError.js';

const app = express();

app.use(
	cors({
		origin: [config.FRONTEND_URL, config.DASHBOARD_URL],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	})
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/tmp/',
	})
);

app.use('/api/v1', routes);
app.get('/', (_req, res) => {
	res.send('Welcome there Moid -- API!');
});

app.all('*', (_req, res) => {
	res.status(404).json({ success: false, message: '404 - Page Not Found' });
});

app.use(errorHandler);
export default app;
