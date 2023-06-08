import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VEHICLE_REPOSITORY } from '../../config/constants';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(VEHICLE_REPOSITORY) private model: Repository<Vehicle>,
  ){}

  async seed(){
    const users = require("../../config/seed/data/vehicles.json");
    await Promise.all(users.map(async (v) => {
        await this.model.save(v);
    }))
  }
}

