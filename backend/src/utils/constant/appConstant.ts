export const INTERFACE_TYPE = {
	ProductRepository: Symbol.for('ProductRepository'),
	ProductInteractor: Symbol.for('ProductInteractor'),
	ProductController: Symbol.for('ProductController'),
	Mailer: Symbol.for('Mailer'),
	MessageBroker: Symbol.for('MessageBroker'),

	// Add more interface type here
	IamPrincipalRepository: Symbol.for('IamPrincipalRepository'),
	IamPrincipalInteractor: Symbol.for('IamPrincipalInteractor'),

	TokenRepository: Symbol.for('TokenRepository'),
	TokenInteractor: Symbol.for('TokenInteractor'),

	LoginController: Symbol.for('LoginController'),
	RegistrationController: Symbol.for('RegistrationController'),
};
