import { Inject, Injectable, Logger } from '@nestjs/common';
import { RoleService } from '../../app/grupo/role.service';
import { UserService } from '../../app/usuario/user.service';
import { VehicleService } from '../../app/veiculo/vehicle.service';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);
  constructor(
    @Inject(RoleService) private roleService: RoleService,
    @Inject(UserService) private userService: UserService,
    @Inject(VehicleService) private vehicleService: VehicleService
  ){}

  async seed(){
    this.logger.debug('Iniciando seeder');
    await this.seedRoles();
    await this.seedUsers();
    await this.seedVehicles();
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
