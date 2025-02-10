import { Container } from 'inversify';
import { IamPrincipalInteractor, TokenInteractor } from '../../interactors';
import {
	IIamPrincipalInteractor,
	ITokenInteractor,
} from '../../interfaces';
import { Router } from 'express';
import {
	IIamPrincipalRepository,
	ITokenRepository,
} from '../../interfaces';
import { IamPrincipalRepository, TokenRepository } from '../../repositories';
import { LoginController, RegistrationController } from '../../controllers';
import { INTERFACE_TYPE } from '../../utils';
import validate from '../../middleware/validate';
import { loginSchema } from '../../validation';

const container = new Container();

container
	.bind<ITokenRepository>(INTERFACE_TYPE.TokenRepository)
	.to(TokenRepository);
container
	.bind<IIamPrincipalRepository>(INTERFACE_TYPE.IamPrincipalRepository)
	.to(IamPrincipalRepository);
container
	.bind<ITokenInteractor>(INTERFACE_TYPE.TokenInteractor)
	.to(TokenInteractor);
container
	.bind<IIamPrincipalInteractor>(INTERFACE_TYPE.IamPrincipalInteractor)
	.to(IamPrincipalInteractor);
container
	.bind<LoginController>(INTERFACE_TYPE.LoginController)
	.to(LoginController);
container
	.bind<RegistrationController>(INTERFACE_TYPE.RegistrationController)
	.to(RegistrationController);

const userRoutes = Router();

const loginController = container.get<LoginController>(
	INTERFACE_TYPE.LoginController
);

const registrationController = container.get<RegistrationController>(
	INTERFACE_TYPE.RegistrationController
);

userRoutes
	.route('/login-email')
	.all(validate(loginSchema))
	.post(loginController.login.bind(loginController));

userRoutes
	.route('/register')
	.post(registrationController.registerEmail.bind(registrationController));

userRoutes
	.route('/re-generate-token')
	.get(loginController.regenerateRefreshToken.bind(loginController))

export default userRoutes;
