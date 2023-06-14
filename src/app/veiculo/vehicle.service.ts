import { Inject, Injectable } from '@nestjs/common';
import {
  CommonPropsCreate,
  CommonPropsDelete,
  CommonPropsFind,
  CommonPropsUpdate,
} from 'src/common/common';
import { RegistroExistenteException } from 'src/exceptions/registro-existente.exception';
import { RegistroNaoEncontradoException } from 'src/exceptions/registro-inexistente.exception';
import { tratarFindOptions } from 'src/utils/helpers';
import { FindManyOptions, In, Like, Not, Repository } from 'typeorm';
import { VEHICLE_REPOSITORY } from '../../config/constants';
import { Vehicle } from './entities/vehicle.entity';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(@Inject(VEHICLE_REPOSITORY) private model: Repository<Vehicle>) {}
  async create({ body, transaction }: CommonPropsCreate<CreateVehicleDto>) {
    const model = transaction.manager.getRepository(Vehicle);
    const exist = model.findOne({ where: { plate: Like(body.plate) } });
    if (exist) {
      throw new RegistroExistenteException({
        coluna: 'plate',
        valor: body.plate,
      });
    }

    return model.save(body);
  }

  async update({ id, body, transaction }: CommonPropsUpdate<UpdateVehicleDto>) {
    const model = transaction.manager.getRepository(Vehicle);
    const vehicle = model.findOne({ where: { id: id } });
    if (!vehicle) {
      throw new RegistroNaoEncontradoException({
        coluna: 'id',
        valor: id,
      });
    }

    //VERIFICAR SE EXISTE ALGUM OUTRO VEÍCULO COM A PLACA INFORMADA
    const vehicleExistente = model.findOne({
      where: { plate: Like(body.plate), id: Not(In([id])) },
    });
    if (vehicleExistente) {
      throw new RegistroExistenteException({
        coluna: 'plate',
        valor: body.plate,
      });
    }

    return model.save({ ...vehicle, ...body });
  }

  async findOne(props: CommonPropsFind<Vehicle> & { id?: number }) {
    let model = this.model;
    if (props?.transaction)
      model = props.transaction.manager.getRepository(Vehicle);
    let options: FindManyOptions<Vehicle> = {
      relations: { checklist: true },
    };
    options = { ...options, ...tratarFindOptions<Vehicle>(props) };
    return model.findOne(options);
  }

  async findAll(props: CommonPropsFind<Vehicle> = {}) {
    let model = this.model;
    if (props?.transaction)
      model = props.transaction.manager.getRepository(Vehicle);
    const options = { ...tratarFindOptions<Vehicle>(props) };
    return model.find(options);
  }

  async delete({ id, transaction }: CommonPropsDelete) {
    const model = transaction.manager.getRepository(Vehicle);
    const vehicle = this.model.findOne({ where: { id: id } });
    if (!vehicle) {
      throw new RegistroNaoEncontradoException({
        coluna: 'id',
        valor: id,
      });
    }

    const deleted = await model.softDelete(id);
    if (deleted.affected) {
      return true;
    }
    return false;
  }

  async seed() {
    const vehiclesJson = require('../../config/seed/data/vehicles.json');
    const vehicles = await Promise.all(
      vehiclesJson.map(async (v) => {
        await this.model.save(v);
      }),
    );
    return vehicles;
  }
}
