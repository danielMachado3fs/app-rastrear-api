import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../config/database.module';
import { VehicleModule } from '../veiculo/vehicle.module';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => VehicleModule)],
  controllers: [ChecklistController],
  providers: [ChecklistService]
})
export class ChecklistModule {}
