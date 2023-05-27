import { Module } from '@nestjs/common';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChecklistModule } from './app/checklist/checklist.module';
import { RoleModule } from './app/grupo/role.module';
import { UserModule } from './app/usuario/user.module';
import { VehicleModule } from './app/veiculo/vehicle.module';
import { DatabaseModule } from './config/database.module';
import { TransactionModule } from './utils/transactions/transaction.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RoleModule,
    VehicleModule,
    ChecklistModule,
    TransactionModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule, UserModule, RoleModule, TransactionModule]
})
export class AppModule {}