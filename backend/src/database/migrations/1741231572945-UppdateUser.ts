import { MigrationInterface, QueryRunner } from "typeorm";

export class UppdateUser1741231572945 implements MigrationInterface {
    name = 'UppdateUser1741231572945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    }

}
