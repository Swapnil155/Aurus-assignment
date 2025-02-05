import { IamPrincipal } from './../../../entities';

export interface IIamPrincipalInteractor {
	checkPrincipalIsExist(email: string): Promise<boolean>;
	createPrincipal(data: Partial<IamPrincipal>): Promise<IamPrincipal>;
	updatePrincipal(
		id: number,
		data: Partial<IamPrincipal>
	): Promise<IamPrincipal>;
	getPrincipals(limit: number, offset: number): Promise<IamPrincipal[] | []>;
	getByIdPrincipal(id: number): Promise<IamPrincipal | null>;
	getByEmailPrincipal(email: string): Promise<IamPrincipal | null>;
	updateLastLogin(id: number): Promise<IamPrincipal>;
}
