import {Column, Entity, ManyToOne,} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity';
import {AbstractEntity} from "../../../common/abstract.entity";

@Entity({ name: 'urls' })
export class UrlEntity extends AbstractEntity {

    @Column()
    originalUrl: string;

    @Column({ unique: true })
    shortCode: string;

    @Column({ default: 0 })
    visitCount: number;

    @ManyToOne(() => UserEntity, (user) => user.urls, { onDelete: 'CASCADE' })
    user: UserEntity;
}
