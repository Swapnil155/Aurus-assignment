import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/helper/ApiError';
import config from '../config/config';
import { roleRights } from '../config/roles';
import { ITokenDecode } from '../interfaces';

// Extend Express Request to include 'principal_xid'
interface AuthenticatedRequest extends Request {
	principal_xid?: string;
}

const verifyCallback = async (
	req: AuthenticatedRequest,
	resolve: (value?: unknown) => void,
	reject: (reason?: Error | unknown) => void,
	requiredRights: string[]
) => {
	const token = req.cookies?.accessToken;
	if (!token) {
		return reject(new ApiError(401, 'Please authenticate'));
	}

	try {
		const decoded = verify(token, config.jwt.secret) as unknown as ITokenDecode;
		req.principal_xid = decoded.sub.toString(); // No TypeScript error now

		if (requiredRights.length) {
			const userRights: string[] = roleRights.get('admin') || [];
			const hasRequiredRights = requiredRights.every((right) =>
				userRights.includes(right)
			);

			if (!hasRequiredRights) {
				return reject(new ApiError(403, 'Forbidden'));
			}
		}

		resolve();
	} catch (error) {
		if (error instanceof JsonWebTokenError) {
			return reject(new ApiError(403, 'Invalid or expired token'));
		}
		return reject(error);
	}
};

const auth =
	(...requiredRights: string[]) =>
		async (req: Request, res: Response, next: NextFunction) => {
			new Promise((resolve, reject) => {
				verifyCallback(req as AuthenticatedRequest, resolve, reject, requiredRights);
			})
				.then(() => next())
				.catch((err) => next(err));
		};

export default auth;
