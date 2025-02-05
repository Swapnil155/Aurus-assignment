import { INTERFACE_TYPE } from './../../utils/constant/appConstant';
import { inject, injectable } from 'inversify';
import { ITokenRepository } from '../../interfaces';
import { ITokenInteractor } from '../../interfaces';
import { sign } from 'jsonwebtoken';
import moment from 'moment';
import config from '../../config/config';

@injectable()
export class TokenInteractor implements ITokenInteractor {
	private repository: ITokenRepository;

	constructor(
		@inject(INTERFACE_TYPE.TokenRepository) repository: ITokenRepository
	) {
		this.repository = repository;
	}

	generateToken(
		principal_xid: number,
		expiresIn: Date,
		type: string,
		secret: string
	): { token: string; expires: Date } {
		const token = sign(
			{
				sub: principal_xid,
				iat: moment().unix(),
				exp: moment(expiresIn).unix(),
				type,
			},
			// { issuer: 'your-issuer', }, if we need to add issuer
			secret
		);
		return { token, expires: expiresIn };
	}

	async generateAuthToken(principal_xid: number): Promise<{
		access: { token: string; expires: Date };
		refresh: { token: string; expires: Date };
	}> {
		const accessTokenExpires = new Date();
		accessTokenExpires.setHours(
			accessTokenExpires.getMinutes() + config.jwt.accessExpirationMinutes
		); // Access token expires in 1 hour

		const refreshTokenExpires = new Date();
		refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7); // Refresh token expires in 7 days

		const accessToken = this.generateToken(
			principal_xid,
			accessTokenExpires,
			'access',
			config.jwt.secret
		);
		const refreshToken = this.generateToken(
			principal_xid,
			refreshTokenExpires,
			'refresh',
			config.jwt.secret
		);

		await this.repository.saveToken(
			refreshToken.token,
			principal_xid,
			accessToken.expires,
			'refresh',
			false
		);

		return {
			access: accessToken,
			refresh: refreshToken,
		};
	}

	async revokeToken(token: string): Promise<boolean> {
		await this.repository.makeBackListToken(token);
		return true;
	}

	async isTokenBlackListed(token: string): Promise<boolean> {
		return this.repository.findToken(token).then((data) => {
			if (data) {
				return true;
			}
			return false;
		});
	}
}
