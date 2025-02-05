import { INTERFACE_TYPE } from './../../utils/constant/appConstant';
import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { AsyncHandler } from '../../utils';
import {
	IIamPrincipalInteractor,
	ITokenInteractor,
} from '../../interfaces';
import ApiError from '../../utils/helper/ApiError';
import { compareSync } from 'bcrypt';
import ApiResponse from '../../utils/helper/ApiResponse';

@injectable()
export class LoginController {
	private tokenInteractor: ITokenInteractor;
	private iamPrincipalInteractor: IIamPrincipalInteractor;

	constructor(
		@inject(INTERFACE_TYPE.TokenInteractor) tokenInteractor: ITokenInteractor,
		@inject(INTERFACE_TYPE.IamPrincipalInteractor)
		iamPrincipalInteractor: IIamPrincipalInteractor
	) {
		this.tokenInteractor = tokenInteractor;
		this.iamPrincipalInteractor = iamPrincipalInteractor;
	}

	@AsyncHandler()
	async login(req: Request, res: Response) {
		const { email, password } = req.body;

		const principal =
			await this.iamPrincipalInteractor.getByEmailPrincipal(email);

		if (!principal) {
			throw new ApiError(400, 'Invalid email or password');
		}

		const isValidPassword = compareSync(password, principal.password_hash);

		if (!isValidPassword) {
			throw new ApiError(400, 'Invalid email or password');
		}

		await this.iamPrincipalInteractor.updateLastLogin(principal.id);

		const tokens = await this.tokenInteractor.generateAuthToken(principal.id);

		res.status(200).json(new ApiResponse(200, tokens, 'Login success'));
	}
}
