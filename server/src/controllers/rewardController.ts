import { Request, Response } from 'express';
import { Reward } from '../models/reward.model';import type { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import{ Transaction } from '../models/transaction.model';

export const getAllRewards = async (req: Request, res: Response) => {
    try {
        const rewards = await Reward.find()
            .populate('owner', 'name email')
            .populate('category', 'name slug icon')
            .exec();

        if (!rewards) {
            return res.status(404).json({ message: 'No rewards found' });
        }

        res.json(rewards);
    } catch (error: any) {
        console.error('Error in getAllRewards:', error);
        res.status(500).json({ 
            message: 'Failed to fetch rewards',
            error: error.message 
        });
    }
};

export const getMyRewards = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user?.userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const rewards = await Reward.find({ owner: req.user.userId })
            .populate('category')
            .exec();

        res.json(rewards);
    } catch (error: any) {
        console.error('Error in getMyRewards:', error);
        res.status(500).json({ message: 'Failed to fetch rewards' });
    }
};

export const getAllAvailableRewards = async (req: Request, res: Response) => {
    try {
        const rewards = await Reward.find({ status: 'available' })
            .populate('owner', 'name email')
            .populate('category', 'name slug icon')
            .exec();

        res.json(rewards);
    } catch (error: any) {
        console.error('Error in getAllAvailableRewards:', error);
        res.status(500).json({ 
            message: 'Failed to fetch available rewards',
            error: error.message 
        });
    }
};

export const createReward = async (req: AuthRequest, res: Response) => {
    try {
        // Validate category ID format if provided
        if (req.body.category) {
            if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
                return res.status(400).json({
                    message: 'Invalid category selected',
                    errors: {
                        category: 'Please select a valid category'
                    }
                });
            }
        }

        // Basic validation
        const validationErrors: Record<string, string> = {};
        
        if (!req.body.title?.trim()) {
            validationErrors.title = 'Title is required';
        }
        
        if (!req.body.description?.trim()) {
            validationErrors.description = 'Description is required';
        }
        
        if (!req.body.points || req.body.points < 0) {
            validationErrors.points = 'Points must be a positive number';
        }
        
        if (!req.body.code?.trim()) {
            validationErrors.code = 'Reward code is required';
        }
        
        if (!req.body.expiryDate || new Date(req.body.expiryDate) <= new Date()) {
            validationErrors.expiryDate = 'Expiry date must be in the future';
        }

        // If there are validation errors, return them
        if (Object.keys(validationErrors).length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: validationErrors
            });
        }

        const reward = new Reward({
            ...req.body,
            owner: req.user?.userId,
            category: req.body.category || null // Make category optional
        });

        await reward.save();
        
        // Populate owner details before sending response
        await reward.populate('owner', 'name email');
        await reward.populate('category');

        res.status(201).json(reward);

    } catch (error: any) {
        console.error('Error creating reward:', error);
        
        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const errors: Record<string, string> = {};
            
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });

            return res.status(400).json({
                message: 'Validation failed',
                errors
            });
        }

        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Duplicate value error',
                errors: {
                    [Object.keys(error.keyPattern)[0]]: 'This value already exists'
                }
            });
        }

        res.status(500).json({ 
            message: 'Error creating reward',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const getRewardById = async (req: AuthRequest, res: Response) => {
  try {
    const reward = await Reward.findById(req.params.id)
      .populate('owner', 'name email');
    
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }
    
    res.json(reward);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reward' });
  }
};

export const redeemReward = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const reward = await Reward.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('category');

    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    // Check if reward is still available
    if (reward.status !== 'available') {
      return res.status(400).json({ message: 'Reward is no longer available' });
    }

    // Get the redeeming user
    const redeemingUser = await User.findById(req.user?.userId);
    if (!redeemingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the reward owner
    const ownerUser = await User.findById(reward.owner);
    if (!ownerUser) {
      return res.status(404).json({ message: 'Reward owner not found' });
    }

    // Prevent self-redemption
    if (redeemingUser._id.toString() === ownerUser._id.toString()) {
      return res.status(400).json({ message: 'Cannot redeem your own reward' });
    }

    // Check if user has enough points
    if (redeemingUser.points < reward.points) {
      return res.status(400).json({ message: 'Insufficient points' });
    }

    // Perform the points transaction
    redeemingUser.points -= reward.points;
    redeemingUser.redeemedRewards = (redeemingUser.redeemedRewards || 0) + 1;
    ownerUser.points += reward.points;

    // Update reward status and redeemer
    reward.status = 'redeemed';
    reward.redeemedBy = redeemingUser._id;
    reward.redeemedAt = new Date();
    reward.isActive = false;

    // Create transaction record
    const transaction = new Transaction({
      fromUser: redeemingUser._id,
      toUser: ownerUser._id,
      points: reward.points,
      reward: reward._id,
      type: 'redemption'
    });

    // Save all changes within the transaction
    await redeemingUser.save({ session });
    await ownerUser.save({ session });
    await reward.save({ session });
    await transaction.save({ session });

    await session.commitTransaction();

    res.json({
      message: 'Reward redeemed successfully',
      userPoints: redeemingUser.points,
      redeemedRewards: redeemingUser.redeemedRewards,
      reward,
      transaction: {
        id: transaction._id,
        points: transaction.points,
        timestamp: transaction.createdAt
      }
    });

  } catch (error) {
    await session.abortTransaction();
    console.error('Redeem error:', error);
    res.status(500).json({ message: 'Error redeeming reward' });
  } finally {
    session.endSession();
  }
};

export const updateReward = async (req: AuthRequest, res: Response) => {
    try {
        const reward = await Reward.findById(req.params.id);
        
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        // Check if user owns the reward
        if (reward.owner.toString() !== req.user?.userId) {
            return res.status(403).json({ message: 'Not authorized to update this reward' });
        }

        const updatedReward = await Reward.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        ).populate('owner', 'name email')
         .populate('category');

        res.json(updatedReward);
    } catch (error) {
        console.error('Error updating reward:', error);
        res.status(500).json({ message: 'Error updating reward' });
    }
};

export const deleteReward = async (req: AuthRequest, res: Response) => {
    try {
        const reward = await Reward.findById(req.params.id);
        
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        // Check if user owns the reward
        if (reward.owner.toString() !== req.user?.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this reward' });
        }

        await Reward.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reward deleted successfully' });
    } catch (error) {
        console.error('Error deleting reward:', error);
        res.status(500).json({ message: 'Error deleting reward' });
    }
};
