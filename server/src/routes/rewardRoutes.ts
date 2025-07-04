import express from 'express';
import { auth } from '../middleware/auth';
import { 
    createReward, 
    getRewardById, 
    updateReward, 
    deleteReward,
    redeemReward,
    getAllAvailableRewards,
    getMyRewards, 
    getAvailableRewards
} from '../controllers/rewardController';

const router = express.Router();

// Public routes (no auth required)
router.get('/', getAllAvailableRewards);
router.get('/:id', getRewardById);

// Protected routes (auth required)
router.use(auth);
router.get('/user/rewards', getAvailableRewards);
router.get('/user/my-rewards', getMyRewards);
router.post('/', createReward);
router.put('/:id', updateReward);
router.delete('/:id', deleteReward);
router.post('/:id/redeem', redeemReward);

export default router; 