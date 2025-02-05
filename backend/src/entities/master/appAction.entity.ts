import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';

@Entity({ name: 'app_actions' })
export class appAction extends BaseEntity {
	@Column({ length: 50 })
	action!: string;
}
