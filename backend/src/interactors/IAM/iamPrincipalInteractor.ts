import { INTERFACE_TYPE } from './../../utils/constant/appConstant';
import { inject, injectable } from 'inversify';
import { IamPrincipal } from '../../entities';
import { IIamPrincipalInteractor } from '../../interfaces';
import { IIamPrincipalRepository } from '../../interfaces/';

@injectable()
export class IamPrincipalInteractor implements IIamPrincipalInteractor {
	private repository: IIamPrincipalRepository;

	constructor(
		@inject(INTERFACE_TYPE.IamPrincipalRepository)
		repository: IIamPrincipalRepository
	) {
		this.repository = repository;
	}

	async updateLastLogin(id: number): Promise<IamPrincipal> {
		const principal = await this.repository.findById(id);
		if (!principal) {
			throw new Error(`Principal with id ${id} not found`);
		}
		principal.lastLogin = new Date();
		const updatedPrincipal = await this.repository.update(id, principal);
		return updatedPrincipal;
	}
	async checkPrincipalIsExist(email: string): Promise<boolean> {
		const principal = await this.repository.findByEmail(email);
		return principal !== null;
	}

	async createPrincipal(data: Partial<IamPrincipal>): Promise<IamPrincipal> {
		const newPrincipal = await this.repository.create(data);
		return newPrincipal;
	}

	async updatePrincipal(
		id: number,
		data: Partial<IamPrincipal>
	): Promise<IamPrincipal> {
		const updatedPrincipal = await this.repository.update(id, data);
		return updatedPrincipal;
	}

	async getPrincipals(limit: number, offset: number): Promise<IamPrincipal[]> {
		const principals = await this.repository.findAll(limit, offset);
		return principals;
	}

	async getByIdPrincipal(id: number): Promise<IamPrincipal | null> {
		const principal = await this.repository.findById(id);
		return principal;
	}

	async getByEmailPrincipal(email: string): Promise<IamPrincipal | null> {
		const principal = await this.repository.findByEmail(email);
		return principal;
	}
}
