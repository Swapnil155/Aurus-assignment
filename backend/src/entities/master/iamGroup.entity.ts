import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'iam_groups' })
export class IamGroup extends BaseEntity {
	@Column({ length: 50 })
	group!: string;
}
