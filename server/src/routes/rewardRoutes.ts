import express from 'express';
import { auth, AuthRequest } from '../middleware/auth';
import { 
    createReward, 
    getRewardById, 
    updateReward, 
    deleteReward,
    redeemReward,
    getAllRewards,
    getAllAvailableRewards,
    getMyRewards 
} from '../controllers/rewardController';

const router = express.Router();

// Public routes (no auth required)
router.get('/', getAllAvailableRewards);
router.get('/:id', getRewardById);

// Protected routes (auth required)
router.use(auth);
router.get('/user/my-rewards', getMyRewards);
router.post('/', createReward);
router.put('/:id', updateReward);
router.delete('/:id', deleteReward);
router.post('/:id/redeem', redeemReward);

export default router; 