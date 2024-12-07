import express from 'express';
import { auth } from '../middleware/auth';
import { redeemReward } from '../controllers/transactionController';
import { redeemLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.post('/redeem', auth, redeemLimiter, redeemReward);

module.exports = router; 
