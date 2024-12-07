import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { CONFIG } from './config/config';
import authRoutes from './routes/auth.routes';
import rewardRoutes from './routes/reward.routes';
import categoryRoutes from './routes/category.routes';
import requestRoutes from './routes/request.routes';
const transactionRoutes = require('./routes/transaction.routes');

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// CORS Configuration
app.use(cors({
    origin: CONFIG.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Welcome to reX API 🚀',
        status: 'active',
        version: CONFIG.API_VERSION,
        environment: CONFIG.NODE_ENV
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/requests', requestRoutes);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        ...(CONFIG.NODE_ENV === 'development' && { stack: err.stack })
    });
});

export default app; 