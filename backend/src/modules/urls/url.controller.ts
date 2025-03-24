import {Body, Controller, Delete, Get, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {UrlService} from './url.service';
import {UrlSimpleDto} from './dto/url-simple.dto';
import {UrlRequestDto} from './dto/url-request.dto';
import {RequireLoggedIn} from '../../guards/role-container';
import {AuthUser} from "../../decorator/auth-user.decorator";
import {UserEntity} from '../user/entities/user.entity';

@Controller('urls')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @RequireLoggedIn()
    @Post()
    async create(
        @Body() body: UrlRequestDto,
        @AuthUser() user: UserEntity
    ): Promise<UrlSimpleDto> {
        const url = await this.urlService.createUrl(
            UrlRequestDto.toUrlRequest(body),
            user
        );
        return UrlSimpleDto.fromDomain(url);
    }

    @RequireLoggedIn()
    @Get()
    async getAllUrls(@AuthUser() user: UserEntity): Promise<UrlSimpleDto[]> {
        const urls = await this.urlService.getAllUrls(user);
        return urls.map(UrlSimpleDto.fromDomain);
    }

    @Get(':shortCode')
    async getUrl(
        @Param('shortCode') shortCode: string,
        @Res() res: Response
    ): Promise<void> {
        const url = await this.urlService.getUrl(shortCode);

        if (!url) {
            res.status(404).json({ statusCode: 404, message: 'URL không tồn tại' });
            return;
        }

        res.setHeader('X-Original-URL', url.originalUrl);
        res.redirect(301, url.originalUrl);
    }

    @RequireLoggedIn()
    @Delete(':shortCode')
    async deleteUrl(
        @Param('shortCode') shortCode: string,
        @AuthUser() user: UserEntity
    ): Promise<void> {
        await this.urlService.deleteUrl(shortCode, user);
    }
}
