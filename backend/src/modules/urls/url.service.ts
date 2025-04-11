import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UrlEntity} from './entities/url.entity';
import {UrlRequest} from './domain/url-request';
import {Url} from './domain/url';
import {UserEntity} from '../user/entities/user.entity';
import {generateCode} from '../../utils/code-utils';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
    ) {}

    async createUrl(urlRequestDto: UrlRequest, user: UserEntity): Promise<Url> {
        const { originalUrl, shortCode } = urlRequestDto;
        const verifiedShortCode = await this.verifyOrGenerateShortCode(shortCode);
        const newUrl = await this.urlRepository.save({
            originalUrl,
            shortCode: verifiedShortCode,
            user,
        });

        return Url.fromEntity(newUrl);
    }

    private async verifyOrGenerateShortCode(shortCode?: string): Promise<string> {
        if (!shortCode) return this.generateUniqueCode();

        const existingUrl = await this.urlRepository.findOneBy({ shortCode });
        if (existingUrl) throw new BadRequestException('Mã đã tồn tại');
        return shortCode;
    }

    private async generateUniqueCode(): Promise<string> {
        const code = generateCode();
        const exists = await this.urlRepository.existsBy({ shortCode: code });
        return exists ? this.generateUniqueCode() : code;
    }

    private async findUrlOrThrow(criteria: Partial<UrlEntity>): Promise<UrlEntity> {
        const urlEntity = await this.urlRepository.findOneBy(criteria);
        if (!urlEntity) throw new NotFoundException('URL không tồn tại');
        return urlEntity;
    }

    async getUrl(shortCode: string): Promise<Url> {
        const urlEntity = await this.findUrlOrThrow({ shortCode });
        return Url.fromEntity(urlEntity);
    }

    async deleteUrl(shortCode: string, user: UserEntity): Promise<void> {
        const urlEntity = await this.findUrlOrThrow({ shortCode, userId: user.id });
        await this.urlRepository.remove(urlEntity);
    }

    async getAllUrls(user: UserEntity): Promise<Url[]> {
        const urlEntities = await this.urlRepository.find({
            where: { userId: user.id },
            order: { createdAt: 'DESC' },
        });
        return Url.fromEntities(urlEntities);
    }
}
