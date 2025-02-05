import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'iam_sources' })
export class IamSource extends BaseEntity {
	@Column({ length: 50 })
	source!: string;
}
