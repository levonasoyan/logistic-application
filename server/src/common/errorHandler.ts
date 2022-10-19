import winston from 'winston';
import dotenv from 'dotenv'

let logDir = process.env.LOG_DIR

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: `${logDir}/error.log`, level: 'error' }),
    ],
    defaultMeta: { service: 'tnt-app' },
  });

// catch block actions for db queries
export const catchAction = (err: any, res: any = null,  status: number = 200) => {
    const level = err.severity === 'ERROR' ? 'error' : 'info';
    logger.log({
        level,
        message: err.message
    });
    res && res.status(status).json({error: {
        message: err.message,
        severity: err.severity
    }});
}