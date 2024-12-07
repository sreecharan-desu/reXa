import express from 'express';
import { auth } from '../middleware/auth';
import { createRequest } from '../controllers/requestController';

const router = express.Router();

router.post('/:rewardId', auth, createRequest);

export default router; 