import { DATA_SOURCE, GRUPO_REPOSITORY } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { Role } from './role.entity';

export const roleProviders = [
  {
    provide: GRUPO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: [DATA_SOURCE],
  },
];
