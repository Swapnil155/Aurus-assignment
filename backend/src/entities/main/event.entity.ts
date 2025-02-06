import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../abstract/base.entity';
import { IamPrincipal } from '../IAM/iamPrincipal.entity';
import { decrypt, encrypt } from '../../utils';

@Entity({ name: 'event' })
export class Event extends BaseEntity {
    @Column()
    eventName!: string;

    @Column({ type: 'date' })
    eventDate!: Date;

    @Column({ type: 'time'})
    eventTime!: string;

    @Column({
        type : 'text',
        transformer: {
            to: (value: string) => encrypt(value),
            from: (value: string) => decrypt(value),
        }
    })
    eventVenue!: string;

    @ManyToOne(() => IamPrincipal, { nullable: true, })
    @JoinColumn({ name: 'principal_xid' })
    iamPrincipal!: IamPrincipal;

}
