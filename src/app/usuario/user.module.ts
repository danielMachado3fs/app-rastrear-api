import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../config/database.module';
import { RoleModule } from '../grupo/role.module';
import { usuarioProviders } from './entities/user.providers';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => RoleModule)],
  controllers: [UserController],
  providers: [UserService, ...usuarioProviders],
  exports: [UserService],
})
export class UserModule {}
