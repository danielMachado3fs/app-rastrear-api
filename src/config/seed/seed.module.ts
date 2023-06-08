import { UserModule } from '../../app/usuario/user.module';
import { DatabaseModule } from '../database.module';
import { SeedService } from './seed.service';

import { Module, forwardRef } from '@nestjs/common';
import { RoleModule } from '../../app/grupo/role.module';
import { VehicleModule } from '../../app/veiculo/vehicle.module';

@Module({
    imports: [
        DatabaseModule, 
        forwardRef(() => UserModule),
        forwardRef(() => VehicleModule),
        forwardRef(() => RoleModule),
    ],
    controllers: [],
    providers: [SeedService],
})
export class SeedModule {}
