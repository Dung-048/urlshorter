import {Module} from "@nestjs/common";
import {ScheduleModule} from '@nestjs/schedule';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UrlEntity} from "./entities/url.entity";
import {UrlService} from "./url.service";
import {UrlSafetyCheckService} from "./service/url.safetycheck.service";
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
        UrlSafetyCheckService,
        VirusTotalService,
    ],
})
export class UrlModule {}
