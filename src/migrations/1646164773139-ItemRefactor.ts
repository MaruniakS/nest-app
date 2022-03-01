import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItemRefactor1646164773139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "item" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "item" RENAME COLUMN "title" TO "name"`,
    );
  }
}
