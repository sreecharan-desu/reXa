import app from './app';
import mongoose from 'mongoose';
import { CONFIG } from './config/config';
import transactionRoutes from './routes/transaction.routes';

const PORT = CONFIG.PORT || 5000;

// Connect to MongoDB
mongoose.connect(CONFIG.MONGODB_URI!)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        
        // Start server after DB connection
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`Environment: ${CONFIG.NODE_ENV}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (error: Error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

app.use('/api/transactions', transactionRoutes);

export default app;