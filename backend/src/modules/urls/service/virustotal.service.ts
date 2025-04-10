import {Injectable, Logger} from '@nestjs/common';
import axios, {AxiosResponse} from 'axios';
import {ApiConfigService} from '../../../shared/services/api-config.service';

@Injectable()
export class VirusTotalService {
    private readonly apiKey: string;
    private readonly logger = new Logger(VirusTotalService.name);

    constructor(private readonly apiConfigService: ApiConfigService) {
        this.apiKey = this.apiConfigService.virustotalKey.apiKey;
    }

    async checkUrlSafety(url: string): Promise<number> {
        const encodedUrl = this.encodeUrl(url);

        try {
            const response = await this.fetchUrlReport(encodedUrl);
            return response.data.data.attributes.last_analysis_stats.malicious || 0;
        } catch (error) {
            this.logger.error(`Lỗi kiểm tra URL: ${url}`, error instanceof Error ? error.stack : '');
            return 0;
        }
    }

    private encodeUrl(url: string): string {
        return Buffer.from(url).toString('base64url');
    }

    private async fetchUrlReport(encodedUrl: string): Promise<AxiosResponse<any>> {
        return axios.get(`https://www.virustotal.com/api/v3/urls/${encodedUrl}`, {
            headers: {
                'x-apikey': this.apiKey,
            },
            timeout: 5000,
        });
    }
}
