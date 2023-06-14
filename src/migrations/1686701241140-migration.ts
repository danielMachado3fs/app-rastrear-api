import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1686701241140 implements MigrationInterface {
    name = 'migration1686701241140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checklist\` CHANGE \`options\` \`options\` longtext NOT NULL DEFAULT `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checklist\` CHANGE \`options\` \`options\` longtext NOT NULL`);
    }

}
