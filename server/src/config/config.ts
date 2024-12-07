import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://srecharandesu:charan%402006@cluster0.a9berin.mongodb.net/reX',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
    RATE_LIMIT_WINDOW: 15 * 60 * 1000,
    RATE_LIMIT_MAX: 5,
}; 