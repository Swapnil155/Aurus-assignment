export const INTERFACE_TYPE = {


	// Third-Party
	Mailer: Symbol.for('Mailer'),

	MessageBroker: Symbol.for('MessageBroker'),


	// Repository
	IamPrincipalRepository: Symbol.for('IamPrincipalRepository'),

	TokenRepository: Symbol.for('TokenRepository'),

	EventRepository: Symbol.for('EventRepository'),



	// Controller
	LoginController: Symbol.for('LoginController'),

	RegistrationController: Symbol.for('RegistrationController'),

	EventController: Symbol.for('EventController'),


	// Interactor
	IamPrincipalInteractor: Symbol.for('IamPrincipalInteractor'),

	TokenInteractor: Symbol.for('TokenInteractor'),

	EventInteractor: Symbol.for('EventInteractor'),


};
