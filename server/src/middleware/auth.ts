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
      return res.status(401).json({ 
        message: 'No token provided',
        code: 'TOKEN_MISSING'
      });
    }

    try {
      const decoded = jwt.verify(token, CONFIG.JWT_SECRET as string) as { userId: string };
      req.user = { userId: decoded.userId };
      next();
    } catch (jwtError: any) {
      if ((jwtError as { name: string }).name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
      }
      throw jwtError;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'Invalid authentication',
      code: 'AUTH_INVALID'
    });
  }
}; 