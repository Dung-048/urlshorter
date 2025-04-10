import {Injectable, Logger} from '@nestjs/common';
import {Cron} from '@nestjs/schedule';
import {UrlService} from '../url.service';
import {Mutex} from 'async-mutex';
import {VirusTotalService} from './virustotal.service';

@Injectable()
export class UrlSafetyCheckService {
    private readonly logger = new Logger(UrlSafetyCheckService.name);
    private readonly mutex = new Mutex();

    constructor(
        private readonly urlService: UrlService,
        private readonly virusTotalService: VirusTotalService,
    ) {}

    @Cron('*/5 * * * *')
    async handleCron(): Promise<void> {
        const release = await this.mutex.acquire();
        try {
            this.logger.log('Bắt đầu cronjob kiểm tra độ an toàn của URL');

            const urls = await this.urlService.findUnscoredUrls(20);

            for (const url of urls) {
                await this.safeProcessUrl(url);
            }
        } catch (error) {
            this.logger.error(
                `Lỗi cronjob kiểm tra độ an toàn: ${error instanceof Error ? error.message : error}`,
            );
        } finally {
            release();
        }
    }

    private async safeProcessUrl(url: { id: string; originalUrl: string }): Promise<void> {
        try {
            const score = await this.virusTotalService.checkUrlSafety(url.originalUrl);
            await this.urlService.updateUrlSafetyScore(url.id, score);

            this.logger.log(`Đã chấm điểm URL: ${url.originalUrl} - Điểm: ${score}`);
        } catch (error) {
            this.logger.error(
                `Lỗi xử lý URL ${url.originalUrl}: ${error instanceof Error ? error.message : error}`,
            );
        }
    }
}
