import { Module } from '@nestjs/common';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './app/usuario/usuario.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule, UsuarioModule]
})
export class AppModule {}