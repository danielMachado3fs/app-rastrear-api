import { DATA_SOURCE, USUARIO_REPOSITORY } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { Usuario } from './usuario.entity';

export const usuarioProviders = [
  {
    provide: USUARIO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Usuario),
    inject: [DATA_SOURCE],
  },
];
