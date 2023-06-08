import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1686181726219 implements MigrationInterface {
    name = 'migration1686181726219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`checklist\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`kmAtual\` int NOT NULL, \`options\` longtext NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`checklist\` ADD CONSTRAINT \`FK_e9d2560bf3433a728cade1cb4b6\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`checklist\` DROP FOREIGN KEY \`FK_e9d2560bf3433a728cade1cb4b6\``);
        await queryRunner.query(`DROP TABLE \`checklist\``);
    }

}
