import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {Mutex} from 'async-mutex';
import {VirusTotalService} from '../service/virustotal.service';
import {ApiConfigService} from '../../../shared/services/api-config.service';
import {InjectRepository} from '@nestjs/typeorm';
import {UrlEntity} from '../entities/url.entity';
import {IsNull, Repository} from 'typeorm';

@Injectable()
export class UrlSafetyCheckJob {
    private readonly logger = new Logger(UrlSafetyCheckJob.name);
    private readonly mutex = new Mutex();

    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
        private readonly virusTotalService: VirusTotalService,
        private readonly apiConfigService: ApiConfigService,
    ) {}

    @Cron('*/5 * * * *')
    async handleCron(): Promise<void> {
        const release = await this.mutex.acquire();
        try {
            this.logger.log('Start check url');

            const limit = this.apiConfigService.urlScoreCronLimit;
            const urls = await this.findUnscoredUrls(limit);

            await Promise.all(urls.map((url) => this.safeProcessUrl(url)));
        } catch (error) {
            this.logger.error(
                `Error cronjob url: ${error instanceof Error ? error.message : error}`,
            );
        } finally {
            release();
        }
    }

    private async findUnscoredUrls(limit: number): Promise<UrlEntity[]> {
        return this.urlRepository.find({
            where: { safetyScore: IsNull() },
            take: limit,
            order: { createdAt: 'ASC' },
        });
    }

    private async safeProcessUrl(url: UrlEntity): Promise<void> {
        try {
            const safetyScore = await this.virusTotalService.checkUrlSafety(url.originalUrl);

            const currentEntity = await this.urlRepository.findOneBy({ id: url.id });
            if (currentEntity) {
                await this.urlRepository.save({
                    ...currentEntity,
                    safetyScore,
                });
            }
            this.logger.log(`${url.originalUrl} - Score: ${safetyScore}`);
        } catch (error) {
            this.logger.error(
                `Failed to process url ${url.originalUrl}: ${error instanceof Error ? error.message : error}`,
            );
            throw error;
        }
    }

}
