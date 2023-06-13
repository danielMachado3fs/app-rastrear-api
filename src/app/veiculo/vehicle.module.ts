import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../config/database.module';
import { ChecklistModule } from '../checklist/checklist.module';
import { vehicleProviders } from './entities/vehicle.providers';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => ChecklistModule)],
  controllers: [VehicleController],
  providers: [VehicleService, ...vehicleProviders],
  exports: [VehicleService]
})
export class VehicleModule {}
