export const JWT_CONFIG = {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '7d'
}; 

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
