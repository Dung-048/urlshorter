import {ApiProperty} from "@nestjs/swagger";
import {RefreshTokenForm} from "../domain/refresh-token-form";

export class RefreshTokenFormDto {
    @ApiProperty()
    refreshToken: string;

    public static toRefreshTokenForm(dto: RefreshTokenFormDto): RefreshTokenForm {
        return {
            refreshToken: dto.refreshToken,
        };
    }
}
