import express from 'express';
import { auth } from '../middleware/auth';
import { 
    getAllRewards,
    getMyRewards,
    getAllAvailableRewards,
    createReward,
    getRewardById,
    updateReward,
    deleteReward
} from '../controllers/rewardController';
import { redeemLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Public routes
router.get('/', getAllRewards);
router.get('/available', getAllAvailableRewards);

// Protected routes
router.use(auth);
router.get('/my-rewards', getMyRewards);
router.post('/', createReward);

// Dynamic routes
router.get('/:id', getRewardById);
router.put('/:id', updateReward);
router.delete('/:id', deleteReward);

export default router;