import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'iam_roles' })
export class IamRole extends BaseEntity {
	@Column({ length: 50 })
	role!: string;
}
