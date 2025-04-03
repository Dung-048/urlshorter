import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UrlController} from './url.controller';
import {UrlService} from './url.service';
import {UrlEntity} from './entities/url.entity';
import {VirusTotalService} from "./service/virustotal.service";

@Module({
    imports: [TypeOrmModule.forFeature([UrlEntity])],
    controllers: [UrlController],
    providers: [UrlService,VirusTotalService],
    exports: [UrlService, VirusTotalService],
})
export class UrlModule {}
