import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../config/database.module';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ChecklistController],
  providers: [ChecklistService]
})
export class ChecklistModule {}
