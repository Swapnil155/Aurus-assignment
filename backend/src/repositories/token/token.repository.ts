import { injectable } from 'inversify';
import { AppDataSource } from '../../config/data-source';
import { Token } from '../../entities';
import { ITokenRepository } from '../../interfaces';
import { Repository } from 'typeorm';

@injectable()
export class TokenRepository implements ITokenRepository {
	private readonly tokenRepository: Repository<Token>;

	constructor() {
		this.tokenRepository = AppDataSource.getRepository(Token);
	}

	async saveToken(
		token: string,
		principal_xid: number,
		expiresAt: Date,
		type: string,
		isBlacklisted: boolean
	): Promise<Token> {
		const newToken = this.tokenRepository.create({
			token,
			iamPrincipal: { id: principal_xid }, // Assuming the `iamPrincipal` relation uses `id` as the primary key
			expiresAt,
			type,
			isBlacklisted,
		});
		return await this.tokenRepository.save(newToken);
	}

	async findToken(token: string): Promise<Token | null> {
		return await this.tokenRepository.findOne({ where: { token, isBlacklisted: false } });
	}

	async makeBackListToken(token: string): Promise<Token | null> {
		const existingToken = await this.findToken(token);
		if (!existingToken) return null;
		existingToken.isBlacklisted = true;
		return await this.tokenRepository.save(existingToken);
	}
}
