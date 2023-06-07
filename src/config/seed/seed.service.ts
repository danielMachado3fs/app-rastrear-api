import { Inject, Injectable, Logger } from '@nestjs/common';
import { RoleService } from 'src/app/grupo/role.service';
import { UserService } from 'src/app/usuario/user.service';
import { VehicleService } from 'src/app/veiculo/vehicle.service';

@Injectable()
export class SeedService {
  private logger = new Logger(SeedService.name);
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(VehicleService) private vehicleService: VehicleService,
    @Inject(RoleService) private roleService: RoleService
  ){}

  async seed(){
    await this.userService.seed();
  }
}
