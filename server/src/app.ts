import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import rewardRoutes from './routes/reward.routes';
import categoryRoutes from './routes/category.routes';
import requestRoutes from './routes/request.routes';
const transactionRoutes = require('./routes/transaction.routes');

const app = express();

console.log('Server starting...');  // Debug log 1

app.use(cors());
app.use(express.json());

// Debug middleware - log all requests
app.use((req, res, next) => {
    console.log('Incoming request:', req.method, req.path);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/categories', categoryRoutes);
console.log('About to register transaction routes...'); // Debug log 2
app.use('/api/transactions', transactionRoutes);
console.log('Transaction routes registered'); // Debug log 3
app.use('/api/requests', requestRoutes);

export default app; 