import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
import { IamPrincipal } from '../IAM/iamPrincipal.entity';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
	@Column()
	token!: string;

	@Column({ type: 'timestamp' })
	expiresAt!: Date;

	@Column()
	type!: string;

	@Column({ default: false })
	isBlacklisted!: boolean;

	@ManyToOne(() => IamPrincipal, (principal) => principal.id, {
		nullable: true,
	})
	@JoinColumn({ name: 'principal_xid' })
	iamPrincipal!: IamPrincipal;
}
