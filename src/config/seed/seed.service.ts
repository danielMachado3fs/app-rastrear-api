import { Inject, Injectable, Logger } from '@nestjs/common';
import { TransactionService } from 'src/utils/transactions/transaction.service';
import { RoleService } from '../../app/grupo/role.service';
import { UserService } from '../../app/usuario/user.service';
import { VehicleService } from '../../app/veiculo/vehicle.service';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);
  constructor(
    @Inject(RoleService) private roleService: RoleService,
    @Inject(UserService) private userService: UserService,
    @Inject(VehicleService) private vehicleService: VehicleService,
    @Inject(TransactionService) private transaction: TransactionService
  ){}

  async seed(){
    this.logger.debug('Iniciando seeder');
    // await this.seedMigration();
    await this.seedRoles();
    await this.seedUsers();
    await this.seedVehicles();
  }

  async seedMigration(){
    const queryRunner = await this.transaction.startTransaction();
    try {
      // await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`model\` varchar(255) NOT NULL, \`yearManufacture\` varchar(255) NOT NULL, \`plate\` varchar(255) NOT NULL, \`dateAcquisition\` datetime NOT NULL, \`type\` enum ('passeio', 'caminhonete', 'caminhao', 'carreta', 'van') NOT NULL, \`status\` enum ('ativo', 'inativo') NOT NULL DEFAULT 'ativo', \`imagem\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`))`);
      // await queryRunner.query(`CREATE TABLE \`checklist-vehicle\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`kmAtual\` int NOT NULL, \`type\` enum ('entrada', 'saida') NOT NULL, \`options\` longtext NULL, \`vehicleId\` int NULL, PRIMARY KEY (\`id\`))`);
      // await queryRunner.query(`CREATE TABLE \`checklist\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`typeVehicle\` enum ('passeio', 'caminhonete', 'caminhao', 'carreta', 'van') NOT NULL, \`options\` longtext NOT NULL DEFAULT , PRIMARY KEY (\`id\`))`);
      await queryRunner.query(`CREATE TABLE \`roles\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` text NULL, PRIMARY KEY (\`id\`))`);
      await queryRunner.query(`CREATE TABLE \`users\` (\`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` enum ('ativo', 'inativo') NOT NULL DEFAULT 'ativo', \`roleId\` int NULL, \`street\` varchar(255) NULL, \`cep\` varchar(20) NULL, \`state\` varchar(4) NULL, \`city\` varchar(255) NULL, \`neighborhoods\` varchar(255) NULL, \`number\` varchar(255) NULL, \`complement\` varchar(255) NULL, PRIMARY KEY (\`id\`))`);
      await queryRunner.query(`ALTER TABLE \`checklist-vehicle\` ADD CONSTRAINT \`FK_ecc3514abc910b0c0653e69822f\` FOREIGN KEY (\`vehicleId\`) REFERENCES \`vehicles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
      await this.transaction.commitTransaction(queryRunner);
      
    } catch (error) {
      await this.transaction.rollbackTransaction(queryRunner);
      console.error(error);
    }
  }

  async seedRoles(){
    const roles = await this.roleService.seed();
    this.logger.debug(`Criados ${roles.length} roles`);
  }

  async seedUsers(){
    const users = await this.userService.seed();
    this.logger.debug(`Criados ${users.length} usuarios`);
  }

  async seedVehicles(){
    const vehicles = await this.vehicleService.seed();
    this.logger.debug(`Criados ${vehicles.length} veiculos`);
  }
}
