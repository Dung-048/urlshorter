import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UrlService} from './url.service';
import {UrlSimpleDto} from './dto/url-simple.dto';
import {UrlRequestDto} from './dto/url-request.dto';

@Controller('urls')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post()
    async create(@Body() body: UrlRequestDto): Promise<UrlSimpleDto> {
        const toRequest = UrlRequestDto.toUrlRequest(body);
        return UrlSimpleDto.fromDomain(await this.urlService.createUrl(toRequest));
    }

    @Get(':shortCode')
    async getUrl(@Param('shortCode') shortCode: string): Promise<UrlSimpleDto> {
        return UrlSimpleDto.fromDomain(await this.urlService.getUrl(shortCode));
    }

    @Get()
    async getAllUrls(): Promise<UrlSimpleDto[]> {
        const urls = await this.urlService.getAllUrls();
        return urls.map(url => UrlSimpleDto.fromDomain(url));
    }

    @Delete(':shortCode')
    async deleteUrl(@Param('shortCode') shortCode: string): Promise<void> {
        await this.urlService.deleteUrl(shortCode);
    }
}
