import {IsEmail} from "class-validator";
import {StringField} from "../../../decorator/field.decorators";
import {LoginForm} from "../domain/login-form";
import _ from "lodash";

export class LoginFormDto {
    @IsEmail()
    @StringField()
    email: string;

    @StringField({minLength: 6})
    password: string;

    public static toLoginForm(dto: LoginFormDto): LoginForm {
        return {
            ...dto,
            email: _.toLower(dto.email)
        };
    }
}
