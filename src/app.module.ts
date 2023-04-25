import { Module } from '@nestjs/common';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './app/usuario/usuario.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    // host: process.env.DATABASE_HOST,
    // port: Number(process.env.DATABASE_PORT),
    // username: process.env.DATABASE_USERNAME,
    // password: process.env.DATABASE_PASSWORD,
    // database: process.env.DATABASE_NAME,
    //   host: 'localhost',
    //   port: 3306,
    //   database: 'app-scf',
    //   username: 'root',
    //   password: '',
    //   entities: [],
    //   synchronize: true,
    // }),
    DatabaseModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [DatabaseModule]
})
export class AppModule {}