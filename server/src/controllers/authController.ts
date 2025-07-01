import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Otp } from '../models/otp.model';
import { JWT_CONFIG } from '../config/jwt.config';
import { AuthRequest } from '../middleware/auth';
import { CONFIG } from '../config/config';
import { sendEmail } from '../services/email';

// Generate 6-digit OTP
const generateOtp = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

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

        // Create new user with initial points and isVerified false
        const user = new User({
            name,
            email,
            password,
            points: 100,
            redeemedRewards: 0,
            isVerified: false
        });

        await user.save();

        // Generate and save OTP
        const otp = generateOtp();
        const otpDoc = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes expiry
        });
        await otpDoc.save();

        // Send OTP email
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <h2>Welcome to reXa!</h2>
                <p>Your OTP for email verification is:</p>
                <h3 style="color: #007bff;">${otp}</h3>
                <p>This code is valid for 10 minutes. Please enter it to verify your email.</p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        `;
        await sendEmail({
            to: email,
            subject: 'Verify Your Email Address',
            html: htmlContent
        });

        res.status(201).json({
            message: 'Registration successful. Please verify your email with the OTP sent.',
            userId: user._id
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: 'Server error during registration' 
        });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    try {
        const { userId, otp } = req.body;

        // Validate input
        if (!userId || !otp) {
            return res.status(400).json({ message: 'User ID and OTP are required',success : false });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found',success : false  });
        }

        // Find OTP
        const otpDoc = await Otp.findOne({ email: user.email, otp });
        if (!otpDoc) {
            return res.status(400).json({ message: 'Invalid or expired OTP',success : false  });
        }

        // Check if OTP is expired
        if (otpDoc.expiresAt < new Date()) {
            await otpDoc.deleteOne();
            return res.status(400).json({ message: 'OTP has expired',success : false  });
        }

        // Mark user as verified and delete OTP
        user.isVerified = true;
        await user.save();
        await otpDoc.deleteOne();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            JWT_CONFIG.secret || 'fallback-secret-key',
            { expiresIn: JWT_CONFIG.expiresIn }
        );

        // Return success without sending password
        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            points: user.points,
            redeemedRewards: user.redeemedRewards,
            isVerified: user.isVerified
        };

        res.json({
            message: 'Email verified successfully',
            success : true 
        });

    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email first' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            CONFIG.JWT_SECRET!,
            { 
                expiresIn: '30d'
            }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                points: user.points,
                redeemedRewards: user.redeemedRewards,
                isVerified: user.isVerified
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
            // If email changed, reset verification
            user.isVerified = false;
            // Generate and send new OTP
            const otp = generateOtp();
            const otpDoc = new Otp({
                email,
                otp,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            });
            await otpDoc.save();

            const htmlContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                    <h2>Email Change Verification</h2>
                    <p>Your OTP for email verification is:</p>
                    <h3 style="color: #007bff;">${otp}</h3>
                    <p>This code is valid for 10 minutes. Please enter it to verify your new email.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `;
            await sendEmail({
                to: email,
                subject: 'Verify Your New Email Address',
                html: htmlContent
            });
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
            redeemedRewards: user.redeemedRewards,
            isVerified: user.isVerified
        };

        res.json(userResponse);
    } catch (error: any) {
        console.error('Profile update error:', error);
        res.status(500).json({ message: error.message || 'Failed to update profile' });
    }
};

export const resendOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        await Otp.deleteMany({ email });

        const otp = generateOtp();
        const otpDoc = new Otp({
            email,
            otp,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        });
        await otpDoc.save();

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <h2>Verify Your Email Address</h2>
                <p>Your new OTP for email verification is:</p>
                <h3 style="color: #007bff;">${otp}</h3>
                <p>This code is valid for 10 minutes.</p>
            </div>
        `;
        await sendEmail({
            to: email,
            subject: 'Verify Your Email Address',
            html: htmlContent,
        });

        res.json({ message: 'New OTP sent successfully' });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Server error during OTP resend' });
    }
};