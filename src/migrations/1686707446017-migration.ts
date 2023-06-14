import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1686707446017 implements MigrationInterface {
    name = 'migration1686707446017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` CHANGE \`imagem\` \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` CHANGE \`image\` \`imagem\` varchar(255) NULL`);
    }

}
