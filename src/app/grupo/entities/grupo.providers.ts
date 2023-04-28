import { DATA_SOURCE, GRUPO_REPOSITORY } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { Grupo } from './grupo.entity';

export const grupoProviders = [
  {
    provide: GRUPO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Grupo),
    inject: [DATA_SOURCE],
  },
];
