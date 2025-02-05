import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'iam_types' })
export class IamType extends BaseEntity {
	@Column({ length: 50 })
	type!: string;
}
