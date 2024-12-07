import express from 'express';
import { 
  createRequest,
  getMyRequests,
  respondToRequest,
  getRequestById
} from '../controllers/requestController';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/:rewardId', auth, createRequest);
router.get('/my-requests', auth, getMyRequests);
router.get('/:id', auth, getRequestById);
router.patch('/:id/respond', auth, respondToRequest);

export default router; 