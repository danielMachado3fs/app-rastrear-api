import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../config/database.module';
import { VehicleModule } from '../veiculo/vehicle.module';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { checklistProviders, checklistVehicleProviders } from './entities/checklist.providers';

@Module({
  imports: [DatabaseModule, forwardRef(() => VehicleModule)],
  controllers: [ChecklistController],
  providers: [ChecklistService, ...checklistProviders, ...checklistVehicleProviders],
  exports: [ChecklistService]
})
export class ChecklistModule {}
