import express from 'express';
import { register, login, getProfile, updateProfile, verifyOtp, resendOtp } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Add this temporary debug route
router.get('/test', (req, res) => {
    res.json({ message: 'Auth router is working' });
});

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);

// Protected routes
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router; 