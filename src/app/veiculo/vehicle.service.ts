import { Inject, Injectable } from '@nestjs/common';
import { VEICULOS_REPOSITORY } from 'src/config/constants';
import { Repository } from 'typeorm';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(VEICULOS_REPOSITORY) private model: Repository<Vehicle>,
  ){}

  async seed(){
    const users = require("src/config/seed/data/vehicles.json");
    await Promise.all(users.map(async (v) => {
        await this.model.save(v);
    }))
  }
}

