import { JwtPayload } from "jsonwebtoken";

export interface ITokenDecode {
	type: string;
	sub: number
}

export interface ITokenInteractor {
	generateAuthToken(principal_xid: number): Promise<{
		access: { token: string; expires: Date };
		refresh: { token: string; expires: Date };
	}>;
	revokeToken(token: string): Promise<boolean>;
	isTokenBlackListed(token: string): Promise<boolean>;
	generateToken(
		principal_xid: number,
		expiresIn: Date,
		type: string,
		secret: string
	): { token: string; expires: Date };
	decodeToken(token: string): Promise<JwtPayload | ITokenDecode>
}
