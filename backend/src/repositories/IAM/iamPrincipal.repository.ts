import { injectable } from 'inversify';
import { Repository } from 'typeorm';
import { IamPrincipal } from '../../entities';
import { AppDataSource } from '../../config/data-source';
import ApiError from '../../utils/helper/ApiError';
import { IIamPrincipalRepository } from '../../interfaces';

@injectable()
export class IamPrincipalRepository implements IIamPrincipalRepository {
	private readonly iamPrincipalRepository: Repository<IamPrincipal>;

	constructor() {
		this.iamPrincipalRepository = AppDataSource.getRepository(IamPrincipal);
	}

	async create(data: Partial<IamPrincipal>): Promise<IamPrincipal> {
		const principal = this.iamPrincipalRepository.create(data);

		return await this.iamPrincipalRepository.save(principal);
	}

	async update(id: number, data: Partial<IamPrincipal>): Promise<IamPrincipal> {
		const existingPrincipal = await this.iamPrincipalRepository.findOne({
			where: { id },
		});

		if (!existingPrincipal) {
			throw new ApiError(404, `Principal with ID ${id} not found`);
		}

		await this.iamPrincipalRepository.update(id, data);

		return this.iamPrincipalRepository.findOneOrFail({ where: { id } });
	}

	async findAll(limit: number, offset: number): Promise<IamPrincipal[]> {
		return await this.iamPrincipalRepository.find({
			take: limit,
			skip: offset,
			order: { id: 'ASC' },
		});
	}
	
	async findById(id: number): Promise<IamPrincipal | null> {
		return await this.iamPrincipalRepository.findOneOrFail({ where: { id } });
	}

	async findByEmail(emailAddress: string): Promise<IamPrincipal | null> {
		return await this.iamPrincipalRepository.findOne({
			where: { emailAddress },
			select: ['id', 'emailAddress', 'password_hash'],
		});
	}
}
