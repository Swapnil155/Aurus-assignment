import winston, { Logger, format } from 'winston';
import config from './config';

const logger: Logger = winston.createLogger({
	level: config.env === 'development' ? 'debug' : 'info',
	format: format.combine(
		format.splat(), // Supports string interpolation
		format.timestamp(), // Adds timestamp to logs
		format.printf((info) => {
			const { timestamp, level, message } = info as {
				timestamp: string;
				level: string;
				message?: unknown;
			};
			return `${timestamp ? new Date(timestamp).toLocaleString() : ''} ${level}: ${message}`;
		})
	),
	transports: [
		// Log to console
		new winston.transports.Console({
			level: config.env === 'development' ? 'debug' : 'info',
			stderrLevels: ['error'], // Log errors to stderr
			format: format.combine(
				format.colorize(), // Adds color for console output
				format.printf((info) => `${info.level}: ${info.message}`)
			),
		}),

		// Optional: Log to a file in production
		...(config.env === 'production'
			? [
					new winston.transports.File({
						filename: 'logs/error.log',
						level: 'error',
					}),
					new winston.transports.File({
						filename: 'logs/combined.log',
					}),
				]
			: []),
	],
});

export default logger;
