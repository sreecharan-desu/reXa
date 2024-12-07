import mongoose from 'mongoose';
import { User } from '../models/user.model';
import { CONFIG } from '../config/config';

const addPointsToExistingUsers = async () => {
    try {
        await mongoose.connect(CONFIG.MONGODB_URI);
        console.log('Connected to MongoDB Atlas');

        const result = await User.updateMany(
            { points: { $exists: false } },
            { $set: { points: 100, redeemedRewards: 0 } }
        );

        console.log(`Updated ${result.modifiedCount} users with initial points`);
        await mongoose.connection.close();
        
    } catch (error) {
        console.error('Migration error:', error);
        process.exit(1);
    }
};

addPointsToExistingUsers(); 