import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    points: number;
    redeemedRewards: number;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    points: {
        type: Number,
        default: 100
    },
    redeemedRewards: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Drop the old username index if it exists
userSchema.pre('save', async function(next) {
    try {
        await mongoose.connection.collection('users').dropIndex('username_1');
    } catch (error) {
        // Index might not exist, continue
    }
    next();
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
};

// Create and export the model
export const User = mongoose.model<IUser>('User', userSchema); 