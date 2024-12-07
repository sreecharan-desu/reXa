import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
}; 