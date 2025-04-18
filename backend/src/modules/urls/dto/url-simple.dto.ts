import {Url} from '../domain/url';
import {ApiProperty} from "@nestjs/swagger";

export class UrlSimpleDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public originalUrl: string;

    @ApiProperty()
    public shortCode: string;

    @ApiProperty()
    public visitCount: number;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    safetyScore: number;


    public static fromDomain(url: Url): UrlSimpleDto {
        return {
            id: url.id,
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            visitCount: url.visitCount,
            createdAt: url.createdAt,
            safetyScore:url.safetyScore,

        };
    }
    public static fromDomains(urls: Url[]): UrlSimpleDto[] {
        return urls.map(this.fromDomain);
    }
}
