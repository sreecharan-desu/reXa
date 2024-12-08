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
  try {
    console.log('Starting reward redemption process...');
    const rewardId = req.params.id;
    const userId = req.user?.userId;

    console.log('RewardID:', rewardId);
    console.log('UserID:', userId);

    if (!userId) {
      console.log('Authentication failed: No user ID');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the reward
    const reward = await Reward.findById(rewardId);
    if (!reward) {
      console.log('Reward not found:', rewardId);
      return res.status(404).json({ message: 'Reward not found' });
    }

    console.log('Found reward:', reward);

    // Basic validations
    if (reward.status !== 'available' || !reward.isActive) {
      console.log('Reward not available:', { status: reward.status, isActive: reward.isActive });
      return res.status(400).json({ message: 'Reward is not available' });
    }

    // Get both users
    const [redeemingUser, ownerUser] = await Promise.all([
      User.findById(userId),
      User.findById(reward.owner)
    ]);

    console.log('Users found:', {
      redeemingUser: redeemingUser?._id,
      ownerUser: ownerUser?._id,
      redeemingPoints: redeemingUser?.points,
      rewardPoints: reward.points
    });

    if (!redeemingUser || !ownerUser) {
      console.log('User not found:', { redeemingUser: !!redeemingUser, ownerUser: !!ownerUser });
      return res.status(404).json({ message: 'User not found' });
    }

    if (redeemingUser.points < reward.points) {
      console.log('Insufficient points:', {
        userPoints: redeemingUser.points,
        requiredPoints: reward.points
      });
      return res.status(400).json({ message: 'Insufficient points' });
    }

    console.log('Starting atomic updates...');

    // Update all documents using findOneAndUpdate for atomic operations
    const [updatedRedeemingUser, updatedOwnerUser, updatedReward] = await Promise.all([
      User.findOneAndUpdate(
        { _id: redeemingUser._id },
        { $inc: { points: -reward.points } },
        { new: true }
      ),
      User.findOneAndUpdate(
        { _id: ownerUser._id },
        { $inc: { points: reward.points } },
        { new: true }
      ),
      Reward.findOneAndUpdate(
        { _id: reward._id },
        { 
          status: 'redeemed',
          redeemedBy: redeemingUser._id,
          redeemedAt: new Date(),
          isActive: false
        },
        { new: true }
      )
    ]);

    // Create transaction record
    const transaction = new Transaction({
      fromUser: redeemingUser._id,
      toUser: ownerUser._id,
      points: reward.points,
      reward: reward._id,
      type: 'redemption'
    });

    await transaction.save();
    console.log('Transaction created:', transaction._id);

    res.json({ 
      message: 'Success', 
      userPoints: updatedRedeemingUser?.points,
      reward: {
        id: updatedReward?._id,
        title: updatedReward?.title,
        status: updatedReward?.status
      }
    });

    console.log('Response sent successfully');

  } catch (error: any) {
    console.error('Redemption error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: 'Failed to redeem reward',
      error: error.message 
    });
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
