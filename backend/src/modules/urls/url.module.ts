import {Module} from "@nestjs/common";
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UrlEntity} from "./entities/url.entity";
import {UrlService} from "./url.service";
import {UrlSafetyCheckJob} from "./job/url.safety.check.job";
import {VirusTotalService} from "./service/virustotal.service";
import {UrlController} from "./url.controller";

@Module({
    imports: [
        ScheduleModule,
        TypeOrmModule.forFeature([UrlEntity]),

    ],
    controllers: [UrlController],
    providers: [
        UrlService,
        UrlSafetyCheckJob,
        VirusTotalService,
    ],
})
export class UrlModule {}
