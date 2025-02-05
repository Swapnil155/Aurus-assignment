import { Token } from '../../../entities';

export interface ITokenRepository {
	saveToken(
		token: string,
		principal_xid: number,
		expiresAt: Date,
		type: string,
		isBlacklisted: boolean
	): Promise<Token>;
	findToken(token: string): Promise<Token | null>;
	makeBackListToken(token: string): Promise<Token | null>;
}
