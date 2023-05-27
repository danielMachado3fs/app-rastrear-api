import { DATA_SOURCE, VEICULO_REPOSITORY } from 'src/config/constants';
import { DataSource } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export const vehicleProviders = [
  {
    provide: VEICULO_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehicle),
    inject: [DATA_SOURCE],
  },
];
