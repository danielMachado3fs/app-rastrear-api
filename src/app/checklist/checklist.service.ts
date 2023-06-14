import { Inject, Injectable } from '@nestjs/common';
import { TypesVehicles } from 'src/common/types';
import { CHECKLIST_REPOSITORY } from 'src/config/constants';
import { Repository } from 'typeorm';
import { CreateChecklistDto, UpdateChecklistDto } from './create-checklist.dto';
import { Checklist, commonOptions } from './entities/checklist.entity';

@Injectable()
export class ChecklistService {
  constructor(
    @Inject(CHECKLIST_REPOSITORY) private checklistModel: Repository<Checklist>
  ){}

  create(createChecklistDto: CreateChecklistDto) {
    return 'This action adds a new checklist';
  }

  findAll() {
    return `This action returns all checklist`;
  }

  async findOneChecklist(typeVechicle: TypesVehicles) {
    console.log('🚀 ~ file: checklist.service.ts:23 ~ typeVechicle 🚀 ➡➡', typeVechicle);
    const data = await this.checklistModel.findOne({
      where: {
        typeVehicle: typeVechicle
      }
    });
    data.options = [...data.commonOptions, ...data.options];
    delete data.commonOptions;
    return data;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }

  async seed() {
    const checklistJson = require('../../config/seed/data/checklist.json');
    const checklist = await Promise.all(
      checklistJson.map(async (v) => {
        v.commonOptions = commonOptions;
        await this.checklistModel.save(v);
      }),
    );
    return checklist;
  }
}
