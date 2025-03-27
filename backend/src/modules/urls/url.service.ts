import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UrlEntity} from './entities/url.entity';
import {UrlRequest} from './domain/url-request';
import {Url} from './domain/url';
import {UserEntity} from '../user/entities/user.entity';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
    ) {}

    async createUrl(urlRequestDto: UrlRequest, user: UserEntity): Promise<Url> {
        let { shortCode } = urlRequestDto;

        if (!shortCode) {
            shortCode = await this.generateUniqueCode();
        } else {

            if (!/^[a-zA-Z0-9_]{6}$/.test(shortCode)) {
                throw new BadRequestException('Mã chứa chữ, số và "_" (6 ký tự)');
            }

            const existingUrl = await this.urlRepository.findOneBy({ shortCode });
            if (existingUrl) {
                throw new BadRequestException('Mã đã tồn tại');
            }
        }

        const newUrl = this.urlRepository.create({
            originalUrl: urlRequestDto.originalUrl,
            shortCode,
            user,
        });

        return Url.fromEntity(await this.urlRepository.save(newUrl));
    }

    private async findUrlOrThrow(criteria: Partial<UrlEntity>): Promise<UrlEntity> {
        const urlEntity = await this.urlRepository.findOneBy(criteria);
        if (!urlEntity) {
            throw new NotFoundException('URL không tồn tại');
        }
        return urlEntity;
    }

    async getUrl(shortCode: string): Promise<Url> {
        const urlEntity = await this.findUrlOrThrow({ shortCode });
        return Url.fromEntity(urlEntity);
    }

    async deleteUrl(shortCode: string, user: UserEntity): Promise<void> {
        const urlEntity = await this.findUrlOrThrow({
            shortCode,
            userId: user.id
        });
        await this.urlRepository.remove(urlEntity);
    }

    async getAllUrls(user: UserEntity): Promise<Url[]> {
        const urlEntities = await this.urlRepository.find({
            where: { userId: user.id },
            order: { createdAt: 'DESC' },
        });
        return Url.fromEntities(urlEntities);
    }

    private async generateUniqueCode(): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
        let code: string;

        do {
            code = Array.from({ length: 6 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        } while (await this.urlRepository.findOneBy({ shortCode: code }));

        return code;
    }
}

