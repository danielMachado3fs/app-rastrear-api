import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database/database.module';
import { veiculoProviders } from './entities/veiculo.providers';
import { VeiculoController } from './veiculo.controller';
import { VeiculoService } from './veiculo.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VeiculoController],
  providers: [...veiculoProviders, VeiculoService],
  exports: [VeiculoService]
})
export class VeiculoModule {}
