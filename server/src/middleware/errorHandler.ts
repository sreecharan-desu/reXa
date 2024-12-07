import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error('Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map((e: any) => e.message)
        });
    }

    if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(400).json({
            message: 'Duplicate key error',
            field: Object.keys(err.keyValue)[0]
        });
    }

    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
}; 