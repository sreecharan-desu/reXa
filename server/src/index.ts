import app from './app';
import mongoose from 'mongoose';
import { CONFIG } from './config/config';

const connectDB = async () => {
    try {
        await mongoose.connect(CONFIG.MONGODB_URI as string);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Connect to MongoDB
connectDB();

export default app;