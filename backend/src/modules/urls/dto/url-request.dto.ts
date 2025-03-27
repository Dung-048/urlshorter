import {IsNotEmpty, IsOptional, IsString, IsUrl, Matches} from 'class-validator';
import {UrlRequest} from '../domain/url-request';

export class UrlRequestDto {
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    originalUrl: string;

    @IsOptional()
    @IsString()
    @Matches(/^[a-zA-Z0-9_]{6}$/,)
    shortCode:string;

    public static toUrlRequest(urlRequestDto: UrlRequestDto): UrlRequest {
        return {
            originalUrl: urlRequestDto.originalUrl,
            shortCode: urlRequestDto.shortCode,
        };
    }
}