import { injectable } from 'inversify';
import logger from '../config/logger';
import { IMailer } from '../interfaces/external-libraries/IMailer';

@injectable()
export class Mailer implements IMailer {
	async sendWelcomeMail(
		to: string,
		subject: string,
		body: unknown
	): Promise<boolean> {
		try {
			logger.debug('Sending welcome mail...', { to, subject, body });
			// Here you would integrate with your email service provider
			// For example, using nodemailer or any other email service
			// await emailService.send({ to, subject, body });
			return true;
		} catch (error) {
			logger.error('Failed to send welcome mail', { error });
			return false;
		}
	}
	async SendMail(to: string, subject: string, body: unknown): Promise<boolean> {
		logger.debug('Sending mail...', { to, subject, body });
		return true;
	}
}
