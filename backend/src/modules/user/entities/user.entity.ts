import {Column, Entity, OneToMany} from "typeorm";
import {AbstractEntity} from "../../../common/abstract.entity";
import {UrlEntity} from "../../urls/entities/url.entity";
import {Gender} from "../domain/gender";
import {RoleType} from "../../../guards/role-type";
import {Uuid} from "../../../common/types";

@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column({ type: 'uuid', unique: true, nullable: true })
    keyCloakId?: Uuid | null;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    picture?: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true,
    })
    gender?: Gender;

    @Column({
        type: 'enum',
        enum: RoleType,
        default: RoleType.USER,
    })
    role: RoleType;

    @Column({ nullable: true })
    appleUserIdentifier?: string;

    @Column({ type: 'date', nullable: true })
    birthday?: string;

    @Column({ nullable: true, default: '' }) // Đặt giá trị mặc định để tránh undefined
    phoneNumber: string;

    @OneToMany(() => UrlEntity, (url) => url.user, { cascade: true })
    urls: UrlEntity[];
}
