import { Test, TestingModule } from '@nestjs/testing';
import { VeiculoController } from '../veiculo.controller';
import { VeiculoService } from '../veiculo.service';

describe('VeiculoController', () => {
  let controller: VeiculoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculoController],
      providers: [VeiculoService],
    }).compile();

    controller = module.get<VeiculoController>(VeiculoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
