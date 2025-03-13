import { MigrationInterface, QueryRunner } from "typeorm";

export class Update21741585412002 implements MigrationInterface {
    name = 'Update21741585412002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" ADD "user_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "key_cloak_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "key_cloak_id" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf" UNIQUE ("key_cloak_id")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone_number" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "UQ_304698b34cb2a9725a93505d3b0"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "FK_5b194a4470977b71ff490dfc64b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "urls" DROP CONSTRAINT "FK_5b194a4470977b71ff490dfc64b"`);
        await queryRunner.query(`ALTER TABLE "urls" ADD CONSTRAINT "UQ_304698b34cb2a9725a93505d3b0" UNIQUE ("original_url")`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone_number" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "key_cloak_id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "key_cloak_id" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf" UNIQUE ("key_cloak_id")`);
        await queryRunner.query(`ALTER TABLE "urls" DROP COLUMN "user_id"`);
    }

}
