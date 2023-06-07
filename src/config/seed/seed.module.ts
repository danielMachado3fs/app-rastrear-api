import { UserModule } from 'src/app/usuario/user.module';
import { DatabaseModule } from '../database.module';
import { SeedService } from './seed.service';

import { Module, forwardRef } from '@nestjs/common';
import { RoleModule } from 'src/app/grupo/role.module';
import { VehicleModule } from 'src/app/veiculo/vehicle.module';

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
