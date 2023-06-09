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
    const vehiclesJson = require("../../config/seed/data/vehicles.json");
    const vehicles = await Promise.all(vehiclesJson.map(async (v) => {
        await this.model.save(v);
    }))
    return vehicles;
  }
}

