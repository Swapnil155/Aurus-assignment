import { Request, Response } from 'express';
import requestId from 'request-ip';
import morgan from 'morgan';
import config from './config';
import logger from './logger';

morgan.token('clientId', (req: Request) => requestId.getClientIp(req) || '');
morgan.token(
	'message',
	(req: Request, res: Response) => res.locals.errorMessage || ''
);

// Formats based on environment
const ipFormat = config.env === 'production' ? ':clientIp - ' : '';
const successFormat = `${ipFormat}:method :url :status - :response-time ms`;
const errorFormat = `${ipFormat}:method :url :status - :response-time ms - message: :message`;

// Handlers
const successHandler = morgan(successFormat, {
	skip: (req: Request, res: Response) => res.statusCode >= 400,
	stream: { write: (msg) => logger.info(msg.trim()) },
});

const errorHandler = morgan(errorFormat, {
	skip: (req: Request, res: Response) => res.statusCode < 400,
	stream: { write: (msg) => logger.error(msg.trim()) },
});

export default {
	successHandler,
	errorHandler,
};
