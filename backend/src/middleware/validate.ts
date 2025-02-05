import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'yup';
import ApiError from '../utils/helper/ApiError';
import { pick } from '../utils/handler/pick.handler';

/**
 * Validation middleware for Express routes.
 * @param schema - Validation schema object (Yup schema for request parts like params, query, body, etc.).
 * @returns Middleware function to validate request properties.
 */
const validate =
	<T extends Record<string, unknown>>(
		schema: Partial<Record<keyof Request, ObjectSchema<T>>>
	) =>
		(req: Request, res: Response, next: NextFunction): void => {
			// Define valid request keys explicitly
			const validRequestKeys = ['params', 'query', 'body', 'file', 'files'] as (keyof Request)[];

			// Extract the schemas for valid parts of the request
			const validSchema = pick(schema, validRequestKeys);

			// Extract the corresponding request properties
			const object = pick(req, Object.keys(validSchema) as (keyof Request)[]);

			// Validate each part of the request
			const promises = Object.keys(validSchema).map((key) =>
				validSchema[key as keyof Request]?.validate(object[key as keyof Request], {
					abortEarly: false,
				})
			);

			// Process validation results
			Promise.all(promises)
				.then((validatedValues) => {
					// Assign validated values back to the request object
					Object.keys(validSchema).forEach((key, index) => {
						// Explicitly cast req to allow dynamic assignment
						(req as Request & Record<string, unknown>)[key] = validatedValues[index];
					});
					next();
				})
				.catch((err: ValidationError) => {
					// Collect and format error messages
					const errorMessage = err.inner.map((detail) => detail.message).join(', ');
					next(new ApiError(400, errorMessage));
				});


		};


export default validate;
