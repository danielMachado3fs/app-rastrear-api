import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TypesVehicles } from 'src/common/types';
import { ChecklistService } from './checklist.service';
import { CreateChecklistDto, UpdateChecklistDto } from './create-checklist.dto';

@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Post()
  async create(@Body() createChecklistDto: CreateChecklistDto) {
    //@ts-ignore
    createChecklistDto.kmAtual = parseInt(createChecklistDto.kmAtual.split(' ')[0]);
    const data = await this.checklistService.create(createChecklistDto)
    console.log(data);
    return data;
  }

  @Get()
  findAll() {
    return this.checklistService.findAll();
  }

  @Get(':typeVehicle')
  async findOne(@Param('typeVehicle') typeVehicle: TypesVehicles) {
    return await this.checklistService.findOneChecklist(typeVehicle);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChecklistDto: UpdateChecklistDto) {
    return this.checklistService.update(+id, updateChecklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checklistService.remove(+id);
  }
}
