import {MigrationInterface, QueryRunner} from "typeorm";

export class initialization1642625068540 implements MigrationInterface {
    name = 'initialization1642625068540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            INSERT INTO users (name, login,password) values('admin', 'admin', '$2a$10$NP.5Qa2IHNjqpyI.D9wuMegnQyLgv83xS7q6xoKiMGbVOdDstWKR6');
        `);
        await queryRunner.query(`
            CREATE TABLE "boards" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "columns" jsonb NOT NULL,
                CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "tasks" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "order" integer NOT NULL,
                "description" character varying NOT NULL,
                "userId" character varying,
                "boardId" character varying NOT NULL,
                "columnId" character varying,
                CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "boards"
        `);
        await queryRunner.query(`
            DROP TABLE "tasks"
        `);
    }

}
