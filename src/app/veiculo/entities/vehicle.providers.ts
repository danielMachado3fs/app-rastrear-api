import { DataSource } from 'typeorm';
import { DATA_SOURCE, VEHICLE_REPOSITORY } from '../../../config/constants';
import { Vehicle } from './vehicle.entity';

export const vehicleProviders = [
  {
    provide: VEHICLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vehicle),
    inject: [DATA_SOURCE],
  },
];
