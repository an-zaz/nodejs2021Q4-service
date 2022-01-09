import { createLogger, format, transports } from 'winston';

const LEVELS: Record<string, string> = {
  '0': 'error',
  '1': 'warn',
  '2': 'info',
  '3': 'debug',
  '4': 'silly',
};

const logLevel = LEVELS[process.env.LOG_LEVEL || '4'] || 'silly';

export const logger = createLogger({
  level: logLevel,
  format: format.combine(format.colorize(), format.cli()),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.uncolorize(), format.json()),
    }),
    new transports.File({
      filename: 'info.log',
      level: 'silly',
      format: format.combine(format.uncolorize(), format.json()),
    }),
  ],
});

logger.silly('silly');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.log('info', 'info from log');
