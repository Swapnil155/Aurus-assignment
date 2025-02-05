import { IamSource } from './../master/iamSource.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
import { IamType } from '../master/iamType.entity';

@Entity({ name: 'iam_principals' })
export class IamPrincipal extends BaseEntity {
	@Column({ nullable: true, length: 100 })
	username!: string;

	@Unique(['emailAddress'])
	@Column({ length: 100 })
	emailAddress!: string;

	@Column({ nullable: true, select: false })
	password_hash!: string;

	@Column({ nullable: true, length: 100 })
	firstName!: string;

	@Column({ nullable: true, length: 100 })
	lastName!: string;

	@Unique(['phoneNumber'])
	@Column({ nullable: true, length: 15 })
	phoneNumber!: string;

	@Column({ nullable: true, length: 255 })
	profileImage!: string;

	@Column({ nullable: true, length: 10 })
	gender!: string;

	@Column({ nullable: true, type: 'timestamp' })
	dateOfBirth!: Date;

	@Column({ nullable: true, length: 255 })
	address!: string;

	@Column({ nullable: true, length: 100 })
	city!: string;

	@Column({ nullable: true, length: 100 })
	state!: string;

	@Column({ nullable: true, length: 100 })
	country!: string;

	@Column({ nullable: true, length: 20 })
	postalCode!: string;

	@Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
	lastLogin!: Date;

	// Flags

	@Column({ nullable: true })
	isEmailVerified!: boolean;

	@Column({ nullable: true })
	isPhoneVerified!: boolean;

	@Column({ nullable: true })
	isProfileComplete!: boolean;

	@Column({ nullable: true })
	isBlocked!: boolean;

	@Column({ nullable: true })
	isSuspended!: boolean;

	@Column({ nullable: true })
	isDeleted!: boolean;

	// Foreign Keys
	@ManyToOne(() => IamType, { nullable: true })
	@JoinColumn({ name: 'principalType_xid' })
	principalType!: IamType;

	@ManyToOne(() => IamSource, { nullable: true })
	@JoinColumn({ name: 'principalSource_xid' })
	principalSource!: IamSource;
}
