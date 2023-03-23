import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './app/usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: process.env.DATABASE_HOST,
      // port: Number(process.env.DATABASE_PORT),
      // username: process.env.DATABASE_USERNAME,
      // password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE_NAME,
      host: 'localhost',
      port: 3306,
      database: 'app-scf',
      username: 'root',
      password: '',
      entities: [],
      synchronize: true,
    }),
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
