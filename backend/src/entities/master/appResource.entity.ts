import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'app_resources' })
export class appResource extends BaseEntity {
	@Column({ length: 50 })
	resource!: string;
}
