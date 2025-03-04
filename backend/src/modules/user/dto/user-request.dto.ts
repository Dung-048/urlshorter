import {Gender} from "../domain/gender";
import {EnumField, StringField} from "../../../decorator/field.decorators";
import {UserRequest} from "../domain/user-request";
import _ from "lodash";

export class UserRequestDto {
    @StringField()
    firstName: string;

    @StringField()
    lastName: string;

    @StringField()
    email: string;

    @EnumField(() => Gender)
    gender: Gender;

    @StringField()
    birthday: string;

    @StringField()
    phoneNumber: string;

    public static toUserRequest(_this: UserRequestDto): UserRequest {
        return {
            ..._this,
            email: _.toLower(_this.email)
        };
    }
}
