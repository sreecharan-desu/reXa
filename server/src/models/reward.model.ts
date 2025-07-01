import mongoose, { Schema, Document } from 'mongoose';

export interface IReward extends Document {
    title: string;
    image_url : string;
    description: string;
    points: number;
    code: string;
    owner: mongoose.Types.ObjectId;
    status: 'available' | 'redeemed' | 'exchanged' | 'pending';
    category?: mongoose.Types.ObjectId;
    redeemedBy: mongoose.Types.ObjectId;
    redeemedAt: Date;
    expiryDate: Date;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

const rewardSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image_url : {
        type: String,
        required: false,
    },
    points: {
        type: Number,
        required: true,
        min: 0
    },
    code: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'redeemed', 'exchanged', 'pending'],
        default: 'available'
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    redeemedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    redeemedAt: Date,
    expiryDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Reward = mongoose.model<IReward>('Reward', rewardSchema); 