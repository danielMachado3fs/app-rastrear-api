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
    await this.userService.seed();
  }
}
