import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api'); //seta o prefixo padrão para acessar as rotas
  app.useGlobalPipes(new ValidationPipe({ transform: true })); //ativa os validadores de parâmetros

  //configura o swegger
  const config = new DocumentBuilder()
    .setTitle('Api App-Rastrear')
    .setDescription(
      'API backend projeto integrador "Sistema de controle de frotas"',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      deepLinking: true,
    },
  });
  await app.listen(3000); //porta para acessar a aplicação
}
bootstrap();
