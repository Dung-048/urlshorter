import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {ApiConfigService} from "../../../shared/services/api-config.service";

@Injectable()
export class VirusTotalService {
    private readonly apiKey: string;
    constructor(private readonly apiConfigService: ApiConfigService) {
        const { apiKey } = this.apiConfigService.virustotalKey;
        this.apiKey = apiKey;
    }

    private encodeUrl(url: string): string {
        return Buffer.from(url).toString('base64url');
    }

    async checkUrlSafety(url: string): Promise<number> {
        const encodedUrl = this.encodeUrl(url);
        try {
            const response = await axios.get(`https://www.virustotal.com/api/v3/urls/${encodedUrl}`, {
                headers: {
                    'x-apikey': this.apiKey,
                },
            });
            return response.data.data.attributes.last_analysis_stats.malicious || 0;
        } catch (error) {
            console.error('Lỗi kiểm tra độ an toàn của URL:', error);
            return 0;
        }
    }
}
