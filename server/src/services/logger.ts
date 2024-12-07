import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'rex-api' },
    transports: [
        // Write all logs error (and below) to error.log
        new winston.transports.DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: 'error',
        }),

        // Write all logs to combined.log
        new winston.transports.DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),

        // Console logging for development
        ...(process.env.NODE_ENV !== 'production' 
            ? [new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
            })]
            : []
        )
    ],
});

export const logError = (error: Error, meta: object = {}) => {
    logger.error({
        message: error.message,
        stack: error.stack,
        ...meta
    });
};

export const logInfo = (message: string, meta: object = {}) => {
    logger.info({
        message,
        ...meta
    });
};

export const logWarning = (message: string, meta: object = {}) => {
    logger.warn({
        message,
        ...meta
    });
};

export default logger; 