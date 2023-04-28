import { Injectable } from '@nestjs/common';
import { CreateGrupoDto, UpdateGrupoDto } from './create-grupo.dto';

@Injectable()
export class GrupoService {
  create(createGrupoDto: CreateGrupoDto) {
    return 'This action adds a new grupo';
  }

  findAll() {
    return `This action returns all grupo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grupo`;
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return `This action updates a #${id} grupo`;
  }

  remove(id: number) {
    return `This action removes a #${id} grupo`;
  }
}
