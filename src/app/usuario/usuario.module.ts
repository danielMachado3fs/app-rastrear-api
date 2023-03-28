import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { usuarioProviders } from './usuario.providers';
import { DatabaseModule } from 'src/config/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [UsuarioService, ...usuarioProviders],
})
export class UsuarioModule {}
