import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';

import {UserEntity} from '../user/entities/user.entity';
import {JwtStrategy} from './jwt-strategy.service';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {KeycloakModule} from "../keycloak/keycloak.module";
import {AppleAuthService} from "./apple-auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), KeycloakModule],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService, AppleAuthService],
    exports: [JwtStrategy],
})
export class AuthModule {
}
