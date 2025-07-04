import { Request, Response } from 'express';
import { Reward } from '../models/reward.model';import type { AuthRequest } from '../middleware/auth';
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import{ Transaction } from '../models/transaction.model';


export const getAllRewards = async (req: Request, res: Response) => {
    try {
        const rewards = await Reward.find()
            .select('-code') // Exclude the `code` field
            .populate('owner', 'name email')
            .populate('category', 'name slug icon')
            .exec()
            ;

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
        const userId = req.user?.userId;
        console.log('Attempting to fetch rewards for userId:', userId);
        
        if (!userId) {
            console.log('No userId found in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Log the query we're about to make
        console.log('Querying rewards with owner:', userId);

        // Find rewards where user is the owner
        const rewards = await Reward.find({ owner: userId })
            .populate('owner', 'name email')
            .populate('category', 'name')
            .sort({ createdAt: -1 })
            .lean()
            ; // Add lean() for better performance

        console.log('Raw rewards found:', rewards);
        console.log(`Found ${rewards.length} rewards owned by user ${userId}`);
        
        // Check the structure of each reward
        rewards.forEach((reward, index) => {
            console.log(`Reward ${index + 1}:`, {
                id: reward._id,
                title: reward.title,
                owner: reward.owner
            });
        });

        res.json({
            data: rewards,
            message: 'Rewards retrieved successfully'
        });

    } catch (error: any) {
        console.error('Error fetching my rewards:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: 'Failed to fetch rewards',
            error: error.message 
        });
    }
};



export const getAvailableRewards = async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const rewards = await Reward.find({ 
          status: 'available',
          owner: { $ne: userId }  // MongoDB way of saying "not equal"
        })
        .select('-code') // Exclude the `code` field
        .populate('owner', 'name email')
        .populate('category', 'name slug icon')
        .exec();
  
      res.json(rewards);
    } catch (error: any) {
      console.error('Error in getAvailableRewards:', error);
      res.status(500).json({ 
        message: 'Failed to fetch available rewards',
        error: error.message 
      });
    }
  };
  

export const getAllAvailableRewards = async (req: Request, res: Response) => {
    const {is_authenticated} = req.query;
    try {
        const rewards = await Reward.find({ status: 'available' })
            .select('-code') // Exclude the `code` field
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
            image_url: req.body.imageUrls[0] || '', // Ensure image_url is set, default to empty string if not provided
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
    .select('-code') // Exclude the `code` field
    .populate('owner', 'name email');
  // Remove category from the response
    
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
        const rewardId = req.params.id;
        const redeemingUserId = req.user?.userId;

        if (!redeemingUserId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const reward = await Reward.findById(rewardId);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        const [redeemingUser, ownerUser] = await Promise.all([
            User.findById(redeemingUserId),
            User.findById(reward.owner)
        ]);

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
                { 
                    $inc: { 
                        points: -reward.points,
                        redeemedRewards: 1  // Increment redeemedRewards count
                    } 
                },
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

        res.json({
            message: 'Reward redeemed successfully',
            transaction,
            updatedRedeemingUser,
            updatedOwnerUser,
            updatedReward
        });

    } catch (error: any) {
        console.error('Error redeeming reward:', error);
        res.status(500).json({ 
            message: 'Failed to redeem reward',
            error: error.message 
        });
    }
};

export const updateReward = async (req: AuthRequest, res: Response) => {
    try {
        const reward = await Reward.findById(req.params.id) // Exclude the `code` field
        ;
        
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
         .populate('category')    .select('-code') // Exclude the `code` field
         ;

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
