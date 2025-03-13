import {IsNotEmpty, IsString} from 'class-validator';
import {UrlRequest} from '../domain/url-request'

export class UrlRequestDto {
    @IsNotEmpty()
    @IsString()
    originalUrl: string;

    @IsNotEmpty()
    @IsString()
    shortCode: string;

    public static toUrlRequest(urlRequestDto: UrlRequestDto): UrlRequest {
        return {
            originalUrl: urlRequestDto.originalUrl,
            shortCode: urlRequestDto.shortCode,
        }
    }
}
