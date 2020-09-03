import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const winstonLogger = expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    colorize: true
});

export default winstonLogger;
