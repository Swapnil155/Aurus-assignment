import requestId from 'request-ip';
import express, { Application, NextFunction, Request, Response } from 'express';
import config from './config/config';
import morgan from './config/morgan';
import path from 'path';
import logger from './config/logger';
import error from './middleware/error';
import routes from './routes';
import ApiError from './utils/helper/ApiError';

class App {
	private app: Application;

	constructor() {
		this.app = express();
		this.initializeMiddlewares();
		this.initializeRoutes();
		this.initializeErrorHandling();
	}

	private initializeMiddlewares(): void {
		if (config.env !== 'test') {
			this.app.use(morgan.successHandler);
			this.app.use(morgan.errorHandler);
		}
		this.app.use(requestId.mw());

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use('/public', express.static(path.join(__dirname, '../public')));
	}

	private initializeRoutes(): void {
		this.app.use('/api', routes);
		// Define our routes
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			next(new ApiError(404, 'Not found'));
		});
	}

	private initializeErrorHandling(): void {
		this.app.use(error.errorConverter);
		this.app.use(error.errorHandler);
	}

	public listen(port: number): ReturnType<typeof this.app.listen> {
		return this.app.listen(port, () => {
			logger.info(`Server listening on port ${config.port}`);
			logger.info(`Environment :- ${config.env}`);
		});
	}
}

export default new App();
