import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['debug','error','log','verbose']
  });
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
    //rota para acessar documentação swegger "api/docs"
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      deepLinking: true,
    },
  });
  //fim configuração swegger

  await app.listen(3000); //porta para acessar a aplicação
}
bootstrap();
