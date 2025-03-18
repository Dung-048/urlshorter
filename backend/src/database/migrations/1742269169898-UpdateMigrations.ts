import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigrations1742269169898 implements MigrationInterface {
    name = 'UpdateMigrations1742269169898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone_number" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone_number" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0"`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "updated_at"`);
    }

}
