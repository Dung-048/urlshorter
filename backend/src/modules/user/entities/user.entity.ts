import {Column, Entity} from "typeorm";
import {Uuid} from "../../../common/types";
import {Gender} from "../domain/gender";
import {AbstractEntity} from "../../../common/abstract.entity";
import {RoleType} from "../../../guards/role-type";

@Entity('users')
export class UserEntity extends AbstractEntity {

    @Column({unique: true, nullable: true})
    keyCloakId?: Uuid;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    picture?: string;

    @Column({unique: true})
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

    @Column({nullable: true})
    appleUserIdentifier?: string;

    @Column({type: 'date', nullable: true})
    birthday?: string;

    @Column({nullable: true})
    phoneNumber: string;
}
