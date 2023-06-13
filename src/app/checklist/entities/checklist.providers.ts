import { DataSource } from 'typeorm';
import { CHECKLIST_REPOSITORY, CHECKLIST_VEHICLE_REPOSITORY, DATA_SOURCE } from '../../../config/constants';
import { Checklist } from './checklist.entity';

export const checklistProviders = [
  {
    provide: CHECKLIST_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Checklist),
    inject: [DATA_SOURCE],
  },
];

export const checklistVehicleProviders = [
  {
    provide: CHECKLIST_VEHICLE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Checklist),
    inject: [DATA_SOURCE],
  },
];
