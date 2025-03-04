import {ApiProperty} from "@nestjs/swagger";
import {GoogleTokenForm} from "../domain/google-token-form";

export class GoogleTokenFormDto {
    @ApiProperty()
    idToken: string;

    @ApiProperty()
    accessToken: string;

    public static toGoogleTokenForm(dto: GoogleTokenFormDto): GoogleTokenForm {
        return {
            idToken: dto.idToken,
            accessToken: dto.accessToken,
        };
    }
}
