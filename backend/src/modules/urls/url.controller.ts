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
        return UrlSimpleDto.fromDomain(await this.urlService.createUrl(
            UrlRequestDto.toUrlRequest(body),
            user
        ));
    }

    @RequireLoggedIn()
    @Get()
    async getAllUrls(@AuthUser() user: UserEntity): Promise<UrlSimpleDto[]> {
        return UrlSimpleDto.fromDomains(await this.urlService.getAllUrls(user));
    }

    @Get(':shortCode')
    async getUrl(
        @Param('shortCode') shortCode: string,
        @Res() res: Response
    ): Promise<void> {
        const url = await this.urlService.getUrl(shortCode);
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
