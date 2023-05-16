import { Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { GrupoModule } from '../grupo/grupo.module';
import { usuarioProviders } from './entities/usuario.providers';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => GrupoModule)],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
  exports: [UsuarioService],
})
export class UsuarioModule {}
