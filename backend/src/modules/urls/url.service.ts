import {Injectable, NotFoundException} from '@nestjs/common';
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
        return Url.fromEntity(await this.urlRepository.save(
            this.urlRepository.create({
                originalUrl: urlRequestDto.originalUrl,
                shortCode: urlRequestDto.shortCode,
                user: user,
            })
        ));
    }

    private async findUrlOrThrow(criterial: Partial<UrlEntity>): Promise<UrlEntity> {
        const urlEntity = await this.urlRepository.findOneBy(criterial);

        if (!urlEntity) {
            throw new NotFoundException('URL không tồn tại');
        }

        return urlEntity;
    }

    async getUrl(shortCode: string): Promise<Url> {
        const urlEntity = await this.findUrlOrThrow({shortCode});
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
}
