import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/v1', routes);
app.get('/', (_req, res) => {
	res.send('Welcome there Moid -- API!');
});

app.all('*', (_req, res) => {
	res.status(404).json({ success: false, message: '404 - Page Not Found' });
});

export default app;
