import { CONFIG } from './config';

export const JWT_CONFIG = {
    secret: CONFIG.JWT_SECRET,
    expiresIn: CONFIG.JWT_EXPIRES_IN
}; 

export const JWT_SECRET = process.env.JWT_SECRET;
