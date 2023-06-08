import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmMock } from 'typeorm-mock';

export const createTestingModule = async (entities: any[], connectionOptions: TypeOrmModuleOptions) => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync({
        useFactory: () => connectionOptions,
      }),
      TypeOrmModule.forFeature(entities),
    ],
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  const typeOrmMock = new TypeOrmMock();
  const repositoryMock = typeOrmMock.getRepositoryMock();

  return {
    module,
    app,
    repositoryMock,
  };
};
