import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUrltable1741574449592 implements MigrationInterface {
    name = 'AddUrltable1741574449592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "urls" ("id" SERIAL NOT NULL, "original_url" character varying NOT NULL, "short_code" character varying NOT NULL, "visit_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_304698b34cb2a9725a93505d3b0" UNIQUE ("original_url"), CONSTRAINT "UQ_e1d29d724dddebbdae878d3f494" UNIQUE ("short_code"), CONSTRAINT "PK_eaf7bec915960b26aa4988d73b0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "urls"`);
    }

}
