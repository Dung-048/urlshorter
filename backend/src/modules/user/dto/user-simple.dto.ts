import {Uuid} from "../../../common/types";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../domain/user";
import {emptyUuid} from "../../../utils/uuid.utils";

export class UserSimpleDto {
    @ApiProperty()
    id: Uuid;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    picture?: string;

    public static fromUser(user?: User): UserSimpleDto {
        if (user == null) {
            return {
                id: emptyUuid,
                firstName: '',
                lastName: '',
                fullName: '',
                picture: ''
            };
        }
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: `${user.firstName} ${user.lastName}`,
            picture: user.picture
        };
    }
}
