import { inject, injectable } from 'inversify';
import { genSaltSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { AsyncHandler, INTERFACE_TYPE } from '../../utils';
import { IIamPrincipalInteractor } from '../../interfaces';
import ApiResponse from '../../utils/helper/ApiResponse';

@injectable()
export class RegistrationController {

	private readonly interactor: IIamPrincipalInteractor;

	constructor(

		@inject(INTERFACE_TYPE.IamPrincipalInteractor)
		interactor: IIamPrincipalInteractor

	) {

		this.interactor = interactor;

	}

	@AsyncHandler()
	async registerEmail(req: Request, res: Response) {

		const salt = genSaltSync(10);
		
		await this.interactor.createPrincipal({

			password_hash: hashSync(req.body.password, salt),

			...req.body,
			
		});

		res.status(200).json(new ApiResponse(200, {}, 'Registration success'));
	}
}
