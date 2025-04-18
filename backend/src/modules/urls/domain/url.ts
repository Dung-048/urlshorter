import {Uuid} from "../../../common/types";
import {User} from "../../user/domain/user";
import {UrlEntity} from '../entities/url.entity';

export class Url {
    id: Uuid;
    originalUrl: string;
    shortCode: string;
    visitCount: number;
    createdAt: Date;
    user?: User;
    safetyScore: number;

    public static fromEntity(urlEntity: UrlEntity): Url {
        return {
            id: urlEntity.id as Uuid,
            originalUrl: urlEntity.originalUrl,
            shortCode: urlEntity.shortCode,
            visitCount: urlEntity.visitCount,
            createdAt: urlEntity.createdAt,
            safetyScore:urlEntity.safetyScore,
            user: User.fromEntity(urlEntity.user),
        };
    }
    public static fromEntities(entities: UrlEntity[]): Url[] {
        return entities.map(this.fromEntity);
    }
}