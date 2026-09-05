import { MigrationInterface, QueryRunner } from "typeorm";

export class TodolistTestDbMigration1788468610382 implements MigrationInterface {
    name = 'TodolistTestDbMigration1788468610382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying(255) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_todos_todo" ("userId" integer NOT NULL, "todoId" integer NOT NULL, CONSTRAINT "PK_271bbe2cb56c8279163612cf578" PRIMARY KEY ("userId", "todoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7675910caa2f739f3b6c1c4794" ON "user_todos_todo"  ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_73037b4e92775fb077a13ba25d" ON "user_todos_todo"  ("todoId") `);
        await queryRunner.query(`ALTER TABLE "user_todos_todo" ADD CONSTRAINT "FK_7675910caa2f739f3b6c1c4794d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_todos_todo" ADD CONSTRAINT "FK_73037b4e92775fb077a13ba25d3" FOREIGN KEY ("todoId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_todos_todo" DROP CONSTRAINT "FK_73037b4e92775fb077a13ba25d3"`);
        await queryRunner.query(`ALTER TABLE "user_todos_todo" DROP CONSTRAINT "FK_7675910caa2f739f3b6c1c4794d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73037b4e92775fb077a13ba25d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7675910caa2f739f3b6c1c4794"`);
        await queryRunner.query(`DROP TABLE "user_todos_todo"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "todo"`);
    }

}
