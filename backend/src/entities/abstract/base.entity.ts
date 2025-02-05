import {
	Column,
	CreateDateColumn,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { IamPrincipal } from '../IAM/iamPrincipal.entity';

export abstract class BaseEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id!: number;

	@ManyToOne(() => IamPrincipal, (creator) => creator.id, { nullable: true })
	@JoinColumn({ name: 'created_by' })
	createdBy!: IamPrincipal;

	@ManyToOne(() => IamPrincipal, (modifier) => modifier.id, { nullable: true })
	@JoinColumn({ name: 'modified_by' })
	modifiedBy!: IamPrincipal;

	@Column({ default: true })
	isActive!: boolean;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
