import { injectable } from 'inversify';
import logger from '../config/logger';
import { IMessageBroker } from '../interfaces/external-libraries/IMessageBroker';

@injectable()
export class MessageBroker implements IMessageBroker {
	async NotifyToPromotionService(product: unknown): Promise<boolean> {
		logger.debug('Message send ...', product);
		return true;
	}
}
