import {Column, Entity, ManyToOne,} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity';
import {AbstractEntity} from "../../../common/abstract.entity";
import {Uuid} from "../../../common/types";

@Entity({ name: 'urls' })
export class UrlEntity extends AbstractEntity {

    @Column()
    originalUrl: string;

    @Column({ unique: true })
    shortCode: string;

    @Column({ default: 0 })
    visitCount: number;
    
    @Column({ nullable: true })
    userId?: Uuid;

    @ManyToOne(() => UserEntity, (user) => user.urls, { onDelete: 'CASCADE' })
    user: UserEntity;
}
