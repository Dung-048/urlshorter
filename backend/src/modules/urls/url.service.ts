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

    async getUrl(shortCode: string): Promise<Url> {
        const urlEntity = await this.urlRepository.findOne({
            where: { shortCode },
        });

        if (!urlEntity) {
            throw new NotFoundException('URL không tồn tại');
        }

        return Url.fromEntity(urlEntity);
    }

    async deleteUrl(shortCode: string, user: UserEntity): Promise<void> {
        const urlEntity = await this.urlRepository.findOneBy({
            shortCode,
            userId: user.id,
        });

        if (!urlEntity) {
            throw new NotFoundException('URL không tồn tại');
        }

        await this.urlRepository.delete({ id: urlEntity.id });
    }

    async getAllUrls(user: UserEntity): Promise<Url[]> {
        const urlEntities = await this.urlRepository.find({
            where: { user: { id: user.id } },
            order: { createdAt: 'ASC' },
        });

        return urlEntities.map(Url.fromEntity);
    }
}
