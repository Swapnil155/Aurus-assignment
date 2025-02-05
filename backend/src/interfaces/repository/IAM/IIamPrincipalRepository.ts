import { IamPrincipal } from './../../../entities/IAM/iamPrincipal.entity';

export interface IIamPrincipalRepository {
	create(data: Partial<IamPrincipal>): Promise<IamPrincipal>;
	update(id: number, data: Partial<IamPrincipal>): Promise<IamPrincipal>;
	findAll(limit: number, offset: number): Promise<IamPrincipal[]>;
	findById(id: number): Promise<IamPrincipal | null>;
	findByEmail(email: string): Promise<IamPrincipal | null>;
}
