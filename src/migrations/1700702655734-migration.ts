import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1700702655734 implements MigrationInterface {
    name = 'migration1700702655734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`state\` varchar(100) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`state\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`state\` varchar(4) NULL`);
    }

}
