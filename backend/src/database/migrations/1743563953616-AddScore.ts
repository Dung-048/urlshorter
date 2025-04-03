import { MigrationInterface, QueryRunner } from "typeorm";

export class AddScore1743563953616 implements MigrationInterface {
    name = 'AddScore1743563953616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "safety_score" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "safety_score"`);
    }

}
