import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1683851730453 implements MigrationInterface {
    name = 'migration1683851730453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grupos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`permissoes\` text NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`grupoId\` int NULL, \`logradouro\` varchar(255) NULL, \`cep\` varchar(20) NULL, \`estado\` varchar(4) NULL, \`cidade\` varchar(255) NULL, \`bairro\` varchar(255) NULL, \`numero\` varchar(255) NULL, \`complemento\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`veiculos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`modelo\` varchar(255) NOT NULL, \`anoFabricacao\` varchar(255) NOT NULL, \`placa\` varchar(255) NOT NULL, \`dataAquisicao\` datetime NOT NULL, \`tipo\` enum ('passeio', 'caminhao', 'carreta') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` ADD CONSTRAINT \`FK_94000cf758b5eb25152cc4eac70\` FOREIGN KEY (\`grupoId\`) REFERENCES \`grupos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios\` DROP FOREIGN KEY \`FK_94000cf758b5eb25152cc4eac70\``);
        await queryRunner.query(`DROP TABLE \`veiculos\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`grupos\``);
    }

}
