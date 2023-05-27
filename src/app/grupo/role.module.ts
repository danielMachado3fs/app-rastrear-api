import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { roleProviders } from './entities/role.providers';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService, ...roleProviders],
  exports: [RoleService]
})
export class RoleModule {}
