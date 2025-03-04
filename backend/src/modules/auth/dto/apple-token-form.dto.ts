import {StringField} from "../../../decorator/field.decorators";
import {AppleTokenForm} from "../domain/apple-token-form";
import {ApiProperty} from "@nestjs/swagger";

export class AppleTokenFormDto {
    @StringField()
    token: string;

    @StringField()
    userIdentifier: string;

    @ApiProperty({required: false})
    email: string | null;

    @ApiProperty({required: false})
    firstName: string | null;

    @ApiProperty({required: false})
    lastName: string | null;

    public static toAppleTokenForm(dto: AppleTokenFormDto): AppleTokenForm {
        return {
            token: dto.token,
            userIdentifier: dto.userIdentifier,
            email: dto.email ?? undefined,
            firstName: dto.firstName ?? undefined,
            lastName: dto.lastName ?? undefined,
        };
    }
}
