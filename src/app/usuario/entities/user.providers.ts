import { DATA_SOURCE, USUARIO_REPOSITORY } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { User } from './user.entity';

export const usuarioProviders = [
  {
    provide: USUARIO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
