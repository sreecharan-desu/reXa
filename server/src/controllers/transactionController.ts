import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Transaction } from '../models/transaction.model';

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