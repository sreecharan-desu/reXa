import express from 'express';
import { auth } from '../middleware/auth';
import { redeemReward, getTransactionHistory } from '../controllers/transactionController';
import { redeemLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/redeem', auth, redeemLimiter, redeemReward);

router.get('/history', auth, getTransactionHistory);

module.exports = router; 
