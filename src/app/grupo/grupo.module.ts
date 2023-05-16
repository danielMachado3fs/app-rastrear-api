import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { grupoProviders } from './entities/grupo.providers';
import { GrupoController } from './grupo.controller';
import { GrupoService } from './grupo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GrupoController],
  providers: [GrupoService, ...grupoProviders],
  exports: [GrupoService]
})
export class GrupoModule {}
