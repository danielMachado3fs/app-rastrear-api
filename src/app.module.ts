import { Logger, Module } from '@nestjs/common';
import 'dotenv/config';
import { AuthModule } from './app/auth/auth.module';
import { AuthService } from './app/auth/auth.service';
import { ChecklistModule } from './app/checklist/checklist.module';
import { RoleModule } from './app/grupo/role.module';
import { UserModule } from './app/usuario/user.module';
import { VehicleModule } from './app/veiculo/vehicle.module';
import { DatabaseModule } from './config/database.module';
import { SeedModule } from './config/seed/seed.module';
import { TransactionModule } from './utils/transactions/transaction.module';

@Module({
    imports: [
        AuthModule,
        SeedModule,
        DatabaseModule,
        UserModule,
        RoleModule,
        VehicleModule,
        ChecklistModule,
        TransactionModule,
    ],
    providers: [AuthService, Logger],
    exports: [
        DatabaseModule,
        UserModule,
        RoleModule,
        TransactionModule,
        VehicleModule,
    ],
})
export class AppModule {}
