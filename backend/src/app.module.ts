import { join } from 'node:path';

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { TypeOrmConfigService } from './database/typeorm-config.service';
import { JwtAuthGuard } from './decorator/jwt-auth-guard';
import { LoggingExceptionFilter } from './filter/error-handling-exception-filter';
import { RolesGuard } from './guards/roles.guard';
import { AuthModule } from "./modules/auth/auth.module";
import { ImageModule } from './modules/image/image.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { UserModule } from './modules/user/user.module';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt'}),
        SharedModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
            imports: [SharedModule],
            useClass: TypeOrmConfigService,
            inject: [ApiConfigService],
            dataSourceFactory: (options) => {
                if (!options) {
                    throw new Error('Invalid options passed');
                }

                return Promise.resolve(
                    addTransactionalDataSource(new DataSource(options)),
                );
            },
        }),
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
        AuthModule,
        UserModule,
        KeycloakModule,
        ImageModule
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: LoggingExceptionFilter,
        },
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule {
}
