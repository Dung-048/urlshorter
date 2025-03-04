import {EnumField, StringField} from "../../../decorator/field.decorators";
import {RegisterForm} from "../domain/register-form";
import {Gender} from "../../user/domain/gender";
import _ from "lodash";

export class RegisterFormDto {
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

    @StringField({minLength: 6})
    password: string;


    public static toRegisterForm(_this: RegisterFormDto): RegisterForm {
        return {
            ..._this,
            email: _.toLower(_this.email)
        };
    }
}
