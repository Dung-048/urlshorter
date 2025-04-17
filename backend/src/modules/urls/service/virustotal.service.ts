import {Injectable, Logger} from '@nestjs/common';
import axios, {AxiosResponse} from 'axios';
import {ApiConfigService} from '../../../shared/services/api-config.service';
import {UrlUtils} from '../../../utils/url-utils';

@Injectable()
export class VirusTotalService {
    private readonly apiKey: string;
    private readonly checkEndpoint: string;
    private readonly timeout: number;
    private readonly logger = new Logger(VirusTotalService.name);

    constructor(private readonly apiConfigService: ApiConfigService) {
        const { apiKey, checkEndpoint, timeout } = this.apiConfigService.virustotal;
        this.apiKey = apiKey;
        this.checkEndpoint = checkEndpoint;
        this.timeout = timeout;
    }

    async checkUrlSafety(url: string): Promise<number> {
        const encodedUrl = UrlUtils.encodeUrl(url);

        try {
            const response = await this.fetchUrlReport(encodedUrl);
            return response.data.data.attributes.last_analysis_stats.malicious || 0;
        } catch (error) {
            this.logger.error(
                `Error check url: ${url}`,
                error instanceof Error ? error.stack : '',
            );
            return 0;
        }
    }

    private async fetchUrlReport(encodedUrl: string): Promise<AxiosResponse<any>> {
        const url = this.checkEndpoint.replace('{encodedUrl}', encodedUrl);
        return axios.get(url, {
            headers: {
                'x-apikey': this.apiKey,
            },
            timeout: this.timeout,
        });
    }
}
