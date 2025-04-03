import {Injectable} from '@nestjs/common';
import axios from 'axios';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class VirusTotalService {
    private readonly apiKey: string;
    constructor(private readonly configService: ConfigService) {
        this.apiKey = <string>this.configService.get<string>('API_KEY');
    }

    async checkUrlSafety(url: string): Promise<number> {
        const encodedUrl = Buffer.from(url).toString('base64');
        const response = await axios.get(`https://www.virustotal.com/api/v3/urls/${encodedUrl}`, {
            headers: {
                'x-apikey': this.apiKey,
            },
        });
        return response.data.data.attributes.last_analysis_stats.malicious || 0;
    }
}
