import express from 'express';
import { auth } from '../middleware/auth';
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

// Public routes
router.get('/', getAllAvailableRewards);
router.get('/:id', getRewardById);

// Protected routes
router.post('/', auth, createReward);
router.get('/user/my-rewards', auth, getMyRewards);
router.put('/:id', auth, updateReward);
router.delete('/:id', auth, deleteReward);
router.post('/:id/redeem', auth, redeemReward);

export default router; 