import express from 'express';
import { auth } from '../middleware/auth';
import { getTransactionHistory } from '../controllers/transactionController';
import { redeemReward } from '../controllers/rewardController';

const router = express.Router();

router.get('/history', auth, getTransactionHistory);
router.post('/redeem/:id', auth, redeemReward);

export default router; 
