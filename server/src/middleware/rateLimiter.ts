import rateLimit from 'express-rate-limit';
import { CONFIG } from '../config/config';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

export const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5
});

export const redeemLimiter = CONFIG.RATE_LIMIT_ENABLED 
    ? rateLimit({
        windowMs: CONFIG.RATE_LIMIT_WINDOW,
        max: CONFIG.RATE_LIMIT_MAX,
        message: { message: 'Too many attempts, please try again later' }
    })
    : (req: any, res: any, next: any) => next(); 