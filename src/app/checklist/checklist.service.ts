import { Injectable } from '@nestjs/common';
import { CreateChecklistDto, UpdateChecklistDto } from './create-checklist.dto';

@Injectable()
export class ChecklistService {
  create(createChecklistDto: CreateChecklistDto) {
    return 'This action adds a new checklist';
  }

  findAll() {
    return `This action returns all checklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checklist`;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
