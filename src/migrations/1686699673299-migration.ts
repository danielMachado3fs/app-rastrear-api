import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1686699673299 implements MigrationInterface {
    name = 'migration1686699673299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`yearManufacture\` varchar(255) NOT NULL, \`plate\` varchar(255) NOT NULL, \`dateAcquisition\` datetime NOT NULL, \`type\` enum ('passeio', 'caminhonete', 'caminhao', 'carreta', 'van') NOT NULL, \`status\` enum ('ativo', 'inativo') NOT NULL DEFAULT 'ativo', \`imagem\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`checklist-vehicle\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`kmAtual\` int NOT NULL, \`type\` enum ('entrada', 'saida') NOT NULL, \`options\` longtext NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`checklist\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`typeVehicle\` enum ('passeio', 'caminhonete', 'caminhao', 'carreta', 'van') NOT NULL, \`options\` longtext NOT NULL DEFAULT , PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` text NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('ativo', 'inativo') NOT NULL DEFAULT 'ativo', \`roleId\` int NULL, \`street\` varchar(255) NULL, \`cep\` varchar(20) NULL, \`state\` varchar(4) NULL, \`city\` varchar(255) NULL, \`neighborhoods\` varchar(255) NULL, \`number\` varchar(255) NULL, \`complement\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`checklist-vehicle\` ADD CONSTRAINT \`FK_ecc3514abc910b0c0653e69822f\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`checklist-vehicle\` DROP FOREIGN KEY \`FK_ecc3514abc910b0c0653e69822f\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`checklist\``);
        await queryRunner.query(`DROP TABLE \`checklist-vehicle\``);
        await queryRunner.query(`DROP TABLE \`vehicles\``);
    }

}
