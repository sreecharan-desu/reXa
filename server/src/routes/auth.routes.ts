import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Add this temporary debug route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth router is working' });
});

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router; 