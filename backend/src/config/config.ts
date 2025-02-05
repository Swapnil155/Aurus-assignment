import dotenv from 'dotenv';
import path from 'path';
import * as yup from 'yup';
import crypto from 'crypto'

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = yup
	.object()
	.shape({
		NODE_ENV: yup
			.string()
			.oneOf(['production', 'development', 'test'])
			.required(),
		PORT: yup.number().default(3000),

		JWT_SECRET: yup.string().required('JWT secret key is required'),
		JWT_ACCESS_EXPIRATION_MINUTES: yup
			.number()
			.default(30)
			.required('minutes after which access tokens expire'),
		JWT_REFRESH_EXPIRATION_DAYS: yup
			.number()
			.default(30)
			.required('days after which refresh tokens expire'),
		JWT_RESET_PASSWORD_EXPIRATION_MINUTES: yup
			.number()
			.default(10)
			.required('minutes after which reset password token expires'),
		JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: yup
			.number()
			.default(10)
			.required('minutes after which verify email token expires'),

		// DataBase
		DB_USERNAME: yup.string().required('DB Username is required'),
		DB_PASSWORD: yup.string().required('DB Password is required'),
		DB_DATABASE_NAME: yup.string().required('Database name is required'),
		DB_HOSTNAME: yup
			.string()
			.default('127.0.0.1')
			.required('DB Hostname is required'),
		DB_PORT: yup.number().default(3306).required('DB Port is required'),
		CRYPTO_SECRET_KEY: yup.string().required('Encryption secret is required'),
		CRYPTO_ALGORITHM: yup.string().default('aes-256-cbc'),
		CRYPTO_IV_LENGTH: yup.number().default(16)
	})
	.noUnknown(true);

// Validate and prepare the configuration
function getConfig() {
	try {
		// Validate the environment variables
		const envVars = envVarsSchema.validateSync(process.env, {
			abortEarly: false, // Validate all fields before throwing errors
			stripUnknown: true, // Remove fields not in the schema
		});

		// Return the validated configuration
		return {
			env: envVars.NODE_ENV,
			port: envVars.PORT,
			jwt: {
				secret: envVars.JWT_SECRET,
				accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
				refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
				resetPasswordExpirationMinutes:
					envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
				verifyEmailExpirationMinutes:
					envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
			},
			database: {
				development: {
					host: envVars.DB_HOSTNAME,
					port: envVars.DB_PORT,
					username: envVars.DB_USERNAME,
					password: envVars.DB_PASSWORD,
					database: envVars.DB_DATABASE_NAME,
					logging: false,
				},
				test: {
					host: envVars.DB_HOSTNAME,
					port: envVars.DB_PORT,
					username: envVars.DB_USERNAME,
					password: envVars.DB_PASSWORD,
					database: envVars.DB_DATABASE_NAME,
					logging: false,
					socketPath: '/var/run/mysqld/mysqld.sock',
				},
				production: {
					host: envVars.DB_HOSTNAME,
					port: envVars.DB_PORT,
					username: envVars.DB_USERNAME,
					password: envVars.DB_PASSWORD,
					database: envVars.DB_DATABASE_NAME,
					logging: false,
					socketPath: '/var/run/mysqld/mysqld.sock',
				},
			},
			crypto: {
				secretKey: crypto.createHash('sha256').update(envVars.CRYPTO_SECRET_KEY).digest(),
				algorithm: envVars.CRYPTO_ALGORITHM,
				iv_length: envVars.CRYPTO_IV_LENGTH
			}
		};
	} catch (error: unknown) {
		if (error instanceof yup.ValidationError) {
			console.error('Validation Errors:', error.errors.join(', '));
		} else {
			console.error('Unexpected error during configuration validation:', error);
		}

		console.error(
			'Server shut down due to incomplete environment variable configuration.'
		);
		process.exit(1); // Exit with error code 1
	}
}

// Validate and export configuration only if validation succeeds
const config = getConfig();
export default config;
