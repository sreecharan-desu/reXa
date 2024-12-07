import app from './app';
import mongoose from 'mongoose';
import { CONFIG } from './config/config';

const PORT = CONFIG.PORT || 5000;

console.log('Starting server...'); // Debug log 6

mongoose.connect(CONFIG.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });