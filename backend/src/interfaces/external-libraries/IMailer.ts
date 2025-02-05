export interface IMailer {
	SendMail(to: string, subject: string, body: unknown): Promise<boolean>;
	sendWelcomeMail(to: string, subject: string, body: unknown): Promise<boolean>;
}
