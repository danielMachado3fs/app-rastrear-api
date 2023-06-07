import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './config/seed/seed.service';
async function bootstrap() {
    NestFactory.createApplicationContext(AppModule)
        .then((appContext) => {
            const logger = appContext.get(Logger);
            const seeder = appContext.get(SeedService);

            seeder
                .seed()
                .then(() => {
                    logger.debug('Finalizando seeder');
                })
                .catch((err) => {
                    logger.debug(err);
                    logger.debug('Erro no seeder');
                    throw err;
                })
                .finally(async () => {
                    await appContext.close();
                    process.exit(0);
                });
        })
        .catch((err) => {
            throw err;
        });
}
bootstrap();
