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

    public static fromEntity(urlEntity: UrlEntity): Url {
        return {
            id: urlEntity.id as Uuid,
            originalUrl: urlEntity.originalUrl,
            shortCode: urlEntity.shortCode,
            visitCount: urlEntity.visitCount,
            createdAt: urlEntity.createdAt,
            user: User.fromEntity(urlEntity.user),
        };
    }
}