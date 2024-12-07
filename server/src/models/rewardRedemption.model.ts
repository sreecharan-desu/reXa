import mongoose from 'mongoose';
import User from './User';
import { Reward } from './reward.model';

const rewardRedemptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    rewardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward',
        required: true,
        index: true
    },
    points: {
        type: Number,
        required: true
    },
    redeemedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for querying redemptions by user and date
rewardRedemptionSchema.index({ userId: 1, redeemedAt: -1 });

export const RewardRedemption = mongoose.model('RewardRedemption', rewardRedemptionSchema); 