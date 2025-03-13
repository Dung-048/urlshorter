import {Url} from '../domain/url';
import {ApiProperty} from "@nestjs/swagger";

export class UrlSimpleDto {
    @ApiProperty()
    public id: string;
    public originalUrl: string;
    public shortCode: string;
    public visitCount: number;
    public createdAt: Date;

    public static fromDomain(url: Url): UrlSimpleDto {
        return {
            id: url.id,
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            visitCount: url.visitCount,
            createdAt: url.createdAt,
        };
    }
}
