import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {UrlEntity} from './entities/url.entity';
import {UrlRequest} from './domain/url-request';
import {Url} from './domain/url';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
    ) {
    }

    async createUrl(urlRequestDto: UrlRequest): Promise<Url> {
        return Url.fromEntity(await this.urlRepository.save(
            this.urlRepository.create({
                originalUrl: urlRequestDto.originalUrl,
                shortCode: urlRequestDto.shortCode,
            })
        ));
    }

    async getUrl(shortCode: string): Promise<Url> {
        const urlEntity = await this.urlRepository.findOneBy( { shortCode: shortCode } );

        if (!urlEntity) {
            throw new NotFoundException();
        }

        return Url.fromEntity(urlEntity);
    }

    async deleteUrl(shortCode: string): Promise<void> {
        const result = await this.urlRepository.delete({shortCode: shortCode});

        if (result.affected == 0) {
            throw new NotFoundException();
        }
    }

    async getAllUrls(): Promise<Url[]> {
        const urlEntities = await this.urlRepository.find();
        return urlEntities.map(urlEntity => Url.fromEntity(urlEntity));
    }

}
