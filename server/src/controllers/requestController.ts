import { Request, Response } from 'express';
import ExchangeRequest from '../models/Request';
import { Reward } from '../models/reward.model';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  userId?: string;
}

export const createRequest = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const reward = await Reward.findById(req.params.rewardId);
    
    if (!reward) {
      return res.status(404).json({ message: 'Reward not found' });
    }

    if (reward.status !== 'available') {
      return res.status(400).json({ message: 'Reward is not available' });
    }

    if (reward.owner.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot request your own reward' });
    }

    const existingRequest = await ExchangeRequest.findOne({
      reward: req.params.rewardId,
      sender: req.userId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Request already exists' });
    }

    const request = new ExchangeRequest({
      reward: req.params.rewardId,
      sender: req.userId,
      receiver: reward.owner,
      message: req.body.message
    });

    await request.save({ session });
    
    // Update reward status
    reward.status = 'pending';
    await reward.save({ session });

    await session.commitTransaction();
    
    await request.populate('sender', 'name email');
    await request.populate('reward');
    
    res.status(201).json(request);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: 'Error creating request' });
  } finally {
    session.endSession();
  }
};

export const getMyRequests = async (req: AuthRequest, res: Response) => {
  try {
    const sentRequests = await ExchangeRequest.find({ sender: req.userId })
      .populate('reward')
      .populate('receiver', 'name email');

    const receivedRequests = await ExchangeRequest.find({ receiver: req.userId })
      .populate('reward')
      .populate('sender', 'name email');

    res.json({
      sent: sentRequests,
      received: receivedRequests
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

export const getRequestById = async (req: AuthRequest, res: Response) => {
  try {
    const request = await ExchangeRequest.findOne({
      _id: req.params.id,
      $or: [{ sender: req.userId }, { receiver: req.userId }]
    })
      .populate('reward')
      .populate('sender', 'name email')
      .populate('receiver', 'name email');

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching request' });
  }
};

export const respondToRequest = async (req: AuthRequest, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const request = await ExchangeRequest.findOne({
      _id: req.params.id,
      receiver: req.userId,
      status: 'pending'
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const { response } = req.body;
    if (!['accepted', 'rejected'].includes(response)) {
      return res.status(400).json({ message: 'Invalid response' });
    }

    request.status = response;
    await request.save({ session });

    const reward = await Reward.findById(request.reward);
    if (!reward) {
      throw new Error('Reward not found');
    }

    reward.status = response === 'accepted' ? 'exchanged' : 'available';
    await reward.save({ session });

    if (response === 'rejected') {
      // Cancel other pending requests for this reward
      await ExchangeRequest.updateMany(
        {
          reward: request.reward,
          status: 'pending',
          _id: { $ne: request._id }
        },
        { status: 'rejected' },
        { session }
      );
    }

    await session.commitTransaction();
    res.json(request);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: 'Error responding to request' });
  } finally {
    session.endSession();
  }
}; 