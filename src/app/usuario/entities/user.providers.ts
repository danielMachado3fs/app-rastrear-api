import { DataSource } from 'typeorm';
import { DATA_SOURCE, USER_REPOSITORY } from '../../../config/constants';
import { User } from './user.entity';

export const usuarioProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
