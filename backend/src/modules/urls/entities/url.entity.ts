import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {UserEntity} from '../../user/entities/user.entity';

@Entity({ name: 'urls' })
export class UrlEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    original_url: string;

    @Column({ unique: true })
    short_code: string;

    @Column({ default: 0 })
    visitCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.urls, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
