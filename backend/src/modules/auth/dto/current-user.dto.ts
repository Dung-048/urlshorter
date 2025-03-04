import {UserEntity} from "../../user/entities/user.entity";
import {Gender} from "../../user/domain/gender";
import {RoleType} from "../../../guards/role-type";
import {Uuid} from "../../../common/types";
import {ApiProperty} from "@nestjs/swagger";

export class CurrentUserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    picture?: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    gender?: Gender;

    @ApiProperty()
    role: RoleType;

    @ApiProperty()
    birthday?: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    relationshipType?: string;

    @ApiProperty()
    relativeOfId?: Uuid;

    public static fromUser(user: UserEntity): CurrentUserDto {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            picture: user.picture,
            gender: user.gender,
            role: user.role,
            birthday: user.birthday,
            phoneNumber: user.phoneNumber,
        };
    }
}
