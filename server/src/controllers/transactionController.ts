import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { Transaction } from '../models/transaction.model';

export const getTransactionHistory = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        console.log('Fetching transactions for user:', userId);
        
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const transactions = await Transaction.find({
            $or: [
                { fromUser: userId },
                { toUser: userId }
            ]
        })
        .populate('reward', 'title points')
        .populate('fromUser', 'name')
        .populate('toUser', 'name')
        .sort({ createdAt: -1 })
        .exec();

        console.log('Found transactions:', transactions.length);
        res.json(transactions);
    } catch (error: any) {
        console.error('Error fetching transaction history:', error);
        res.status(500).json({ 
            message: 'Failed to fetch transaction history',
            error: error.message 
        });
    }
};