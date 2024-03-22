import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    DASHBOARD_URL: process.env.DASHBOARD_URL,
    CLOUDINARTY_NAME: process.env.CLOUDINARTY_NAME,
    CLOUDINARTY_API_SECRET: process.env.CLOUDINARTY_API_SECRET,
    CLOUDINARTY_API_KEY: process.env.CLOUDINARTY_API_KEY,
}

export default config;