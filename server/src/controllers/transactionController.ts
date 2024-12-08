import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import User from '../models/User';
import { RewardRedemption } from '../models/rewardRedemption.model';
import { Reward } from '../models/reward.model';
import mongoose from 'mongoose';
import { Transaction } from '../models/transaction.model';

export const redeemReward = async (req: AuthRequest, res: Response) => {
    const startTime = Date.now();
    console.log(`[Redeem] Starting redemption process at ${new Date().toISOString()}`);
    
    try {
        const { rewardId } = req.body;
        const userId = req.user?.userId;
        console.log(`[Redeem] Processing request for userId: ${userId}, rewardId: ${rewardId}`);

        if (!userId) {
            console.log('[Redeem] Authentication failed - no userId found');
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // First fetch the reward to get points and owner
        const reward = await Reward.findById(rewardId);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        console.log(`[Redeem] Attempting points transfer from user ${userId} to owner ${reward.owner}`);
        
        // Start a session for atomic transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Update reward status
            await Reward.findByIdAndUpdate(
                rewardId,
                {
                    $set: {
                        status: 'redeemed',
                        redeemedBy: userId,
                        redeemedAt: new Date(),
                        isActive: false
                    }
                },
                { session }
            );

            // Deduct points from redeeming user
            const redeemingUser = await User.findOneAndUpdate(
                { 
                    _id: userId,
                    points: { $gte: reward.points }
                },
                {
                    $inc: { points: -reward.points }
                },
                { new: true, session }
            );

            if (!redeemingUser) {
                throw new Error('User not found or insufficient points');
            }

            // Add points to reward owner
            const ownerUser = await User.findByIdAndUpdate(
                reward.owner,
                {
                    $inc: { points: reward.points }
                },
                { new: true, session }
            );

            if (!ownerUser) {
                throw new Error('Reward owner not found');
            }

            // Create redemption record
            const redemption = await RewardRedemption.create([{
                userId,
                rewardId,
                points: reward.points,
                redeemedAt: new Date()
            }], { session });

            await session.commitTransaction();
            console.log(`[Redeem] Points transfer and reward status update completed successfully`);

            const totalTime = Date.now() - startTime;
            return res.status(200).json({
                message: 'Reward redeemed successfully',
                remainingPoints: redeemingUser.points,
                redemptionId: redemption[0]._id,
                processingTime: totalTime
            });

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error: any) {
        const totalTime = Date.now() - startTime;
        console.error(`[Redeem] Error occurred after ${totalTime}ms:`, error);
        
        return res.status(500).json({ 
            message: error.message || 'Failed to redeem reward',
            processingTime: totalTime
        });
    }
}

export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        
        const transactions = await Transaction.find({
            $or: [
                { fromUser: userId },
                { toUser: userId }
            ]
        })
        .populate('reward', 'title points')
        .populate('fromUser', 'name')
        .populate('toUser', 'name')
        .sort({ createdAt: -1 });

        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ 
            message: 'Failed to fetch transaction history' 
        });
    }
};