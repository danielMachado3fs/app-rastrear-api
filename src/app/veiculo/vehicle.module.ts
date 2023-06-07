import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { vehicleProviders } from './entities/vehicle.providers';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VehicleController],
  providers: [VehicleService, ...vehicleProviders],
  exports: [VehicleService]
})
export class VehicleModule {}
