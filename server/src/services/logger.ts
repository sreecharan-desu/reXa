import winston from 'winston';
import { CONFIG } from '../config/config';

const logger = winston.createLogger({
    level: CONFIG.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        // Console transport
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        // File transport for errors
        new winston.transports.File({ 
            filename: 'logs/error.log', 
            level: 'error' 
        }),
        // File transport for all logs
        new winston.transports.File({ 
            filename: 'logs/combined.log' 
        })
    ]
});

export default logger; 