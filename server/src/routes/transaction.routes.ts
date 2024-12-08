import express from 'express';
import { auth } from '../middleware/auth';
import { getTransactionHistory } from '../controllers/transactionController';
import { redeemReward } from '../controllers/rewardController';
import { redeemLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/redeem/:id', auth, redeemLimiter, redeemReward);

router.get('/history', auth, getTransactionHistory);

export default router; 
