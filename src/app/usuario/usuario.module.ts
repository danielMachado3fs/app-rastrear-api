import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { usuarioProviders } from './entities/usuario.providers';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
  exports: [UsuarioService],
})
export class UsuarioModule {}
