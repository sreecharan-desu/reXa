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
import transactionRoutes from './routes/transaction.routes';

const app = express();

// Security Middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

// Global CORS configuration
const allowedOrigins = [
    'https://rex-beige.vercel.app',    // Production frontend only
    'https://rex-api-two.vercel.app'   // Production backend only
];

// CORS middleware configuration
const corsOptions = {
    origin: function (origin: string | undefined, callback: any) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('Blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range', 'Authorization']
};

// Apply CORS before any other middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

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
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/requests', requestRoutes);

// Error handling middleware - place after routes
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error:', err);
    
    // Send CORS headers even for errors
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
    }
    
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        code: err.code || 'SERVER_ERROR'
    });
});

export default app; 