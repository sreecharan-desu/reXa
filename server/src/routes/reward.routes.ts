import express from 'express';
import { auth } from '../middleware/auth';
import { Reward } from '../models/reward.model';
import { AuthRequest } from '../middleware/auth';
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
router.get('/my-rewards', auth, async (req: AuthRequest, res) => {
    try {
        const rewards = await Reward.find({ 
            'owner._id': req.user?.userId 
        }).sort({ createdAt: -1 });
        
        res.json({ data: rewards });
    } catch (error) {
        console.error('Error fetching my rewards:', error);
        res.status(500).json({ 
            message: 'Failed to fetch rewards',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
router.post('/', createReward);

// Dynamic routes
router.get('/:id', getRewardById);
router.put('/:id', updateReward);
router.delete('/:id', deleteReward);

export default router;