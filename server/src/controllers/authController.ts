import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { JWT_CONFIG } from '../config/jwt.config';
import { AuthRequest } from '../middleware/auth';
import { CONFIG } from '../config/config';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ 
                message: 'Please provide all required fields' 
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Email already registered' 
            });
        }

        // Create new user with initial points
        const user = new User({
            name,
            email,
            password,
            points: 100,  // Initial points for new users
            redeemedRewards: 0
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_CONFIG.secret,
            { expiresIn: JWT_CONFIG.expiresIn }
        );

        // Return success without sending password
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            points: user.points,
            redeemedRewards: user.redeemedRewards
        };

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error during registration' 
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            CONFIG.JWT_SECRET!,
            { 
                expiresIn: '30d' // Extend token validity to 30 days
            }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                points: user.points,
                redeemedRewards: user.redeemedRewards
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Failed to fetch profile' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { name, email, currentPassword, newPassword } = req.body;
        
        if (!req.user?.userId) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is already taken by another user
        if (email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        // Handle password update if provided
        if (currentPassword && newPassword) {
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        user.name = name;
        user.email = email;
        await user.save();

        // Return user without password
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            points: user.points,
            redeemedRewards: user.redeemedRewards
        };

        res.json(userResponse);
    } catch (error: any) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: error.message || 'Failed to update profile' });
    }
};
