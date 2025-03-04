import {Column, Entity, ManyToOne} from "typeorm";
import {Uuid} from "../../../common/types";
import {Gender} from "../domain/gender";
import {AbstractEntity} from "../../../common/abstract.entity";
import {RoleType} from "../../../guards/role-type";
import {HealInfoEntity} from "../../heal-info/entities/heal-info.entity";
import {HandbookEntity} from "../../handbook/entities/handbook.entity";
import {HealRecordEntity} from "../../heal-record/entities/heal-record.entity";
import {FoodEntity} from "../../food/entities/food.entity";
import {DiaryNutriEntity} from "../../diary-nutri/entities/diary-nutri.entity";
import {FoodMenuEntity} from "../../food-menu/entities/food-menu.entity";
import {FoodMenuFavoriteEntity} from "../../food-menu/entities/food-menu-favorite.entity";

@Entity('users')
export class UserEntity extends AbstractEntity {

    @Column({unique: true, nullable: true})
    keyCloakId?: Uuid;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({nullable: true})
    picture?: string;

    @Column({unique: true})
    email: string;

    @Column({
        type: 'enum',
        enum: Gender,
        nullable: true,
    })
    gender?: Gender;

    @Column({
        type: 'enum',
        enum: RoleType,
        default: RoleType.USER,
    })
    role: RoleType;

    @Column({nullable: true})
    appleUserIdentifier?: string;

    @Column({type: 'date', nullable: true})
    birthday?: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({default: false})
    isDoctor: boolean;

    @Column({nullable: true})
    relationshipType?: string;

    @Column({type: 'uuid', nullable: true})
    relativeOfId?: Uuid;

    @ManyToOne(() => UserEntity, (user) => user.relatives, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    relativeOf?: UserEntity;

    relatives: UserEntity[];

    healInfos: HealInfoEntity[];

    healRecords: HealRecordEntity[];

    createdHealRecords: HealRecordEntity[];

    handbooks: HandbookEntity[];

    diaries: DiaryNutriEntity[];

    createdDiaries: DiaryNutriEntity[];

    createdFoods: FoodEntity[];

    foodFavorites: FoodEntity[];

    foodMenus: FoodMenuEntity[];

    foodMenuFavorites: FoodMenuFavoriteEntity[];
}
