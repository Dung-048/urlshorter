import {AppleTokenForm} from "./domain/apple-token-form";
import {AuthResult} from "./domain/auth-result";
import verifyAppleToken from "verify-apple-id-token";
import {IsNull, Not, Repository} from "typeorm";
import {UserEntity} from "../user/entities/user.entity";
import {KeycloakService} from "../keycloak/keycloak.service";
import {InjectRepository} from "@nestjs/typeorm";
import {ApiConfigService} from "../../shared/services/api-config.service";
import {Injectable} from "@nestjs/common";
import {VerifyAppleIdTokenResponse} from "verify-apple-id-token/dist/lib/types";


@Injectable()
export class AppleAuthService {

    constructor(private readonly keycloakService: KeycloakService,
                @InjectRepository(UserEntity)
                private readonly userRepository: Repository<UserEntity>,
                private apiConfigService: ApiConfigService) {
    }

    async appleLogin(appleTokenForm: AppleTokenForm): Promise<AuthResult> {
        const jwtClaims = await verifyAppleToken({
            idToken: appleTokenForm.token,
            clientId: this.apiConfigService.appleConfig.clientIds
        });

        const user = await this.findUser(jwtClaims)
            ?? await this.createUser({
                email: jwtClaims.email,
                appleUserIdentifier: jwtClaims.sub,
                firstName: appleTokenForm.firstName,
                lastName: appleTokenForm.lastName,
            });

        return await this.createTokenForUser(user);
    }

    private async findUser(jwtClaims: VerifyAppleIdTokenResponse): Promise<UserEntity | null> {
        const userByIdentifier = await this.userRepository.findOneBy({
            appleUserIdentifier: jwtClaims.sub,
            keyCloakId: Not(IsNull())
        });

        if (userByIdentifier !== null) {
            return userByIdentifier;
        }

        if (jwtClaims.email === null) {
            return null;
        }

        const userByEmail = await this.userRepository.findOneBy({
            email: jwtClaims.email,
            keyCloakId: Not(IsNull())
        });

        if (userByEmail !== null) {
            return await this.userRepository.save({
                ...userByEmail,
                appleUserIdentifier: jwtClaims.sub
            });
        }

        return null;
    }

    private async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
        const userInfo = {
            email: user.email!,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        const keycloakUser = await this.keycloakService.createUser(userInfo);

        return await this.userRepository.save(
            this.userRepository.create({
                keyCloakId: keycloakUser.id,
                ...userInfo,
                appleUserIdentifier: user.appleUserIdentifier!,
            }));
    }

    private async createTokenForUser(user: UserEntity): Promise<AuthResult> {
        const token = await this.keycloakService.impersonate(user.keyCloakId!);

        return {
            user,
            token
        }
    }
}
