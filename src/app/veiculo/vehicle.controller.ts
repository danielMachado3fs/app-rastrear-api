import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, forwardRef } from '@nestjs/common';
import { TransactionService } from 'src/utils/transactions/transaction.service';
import { CreateVehicleDto, UpdateVehicleDto } from './vehicle.dto';
import { VehicleService } from './vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(
    @Inject(forwardRef(() => VehicleService)) private readonly vehicleService: VehicleService,
    @Inject(forwardRef(() => TransactionService)) private readonly transaction: TransactionService,
    ) {}

  @Post()
  async create(@Body() body: CreateVehicleDto) {
    const transaction = await this.transaction.startTransaction();
    try{
      const data = this.vehicleService.create({body, transaction});
      await this.transaction.commitTransaction(transaction);
      return data;
    }catch(err){
      await this.transaction.rollbackTransaction(transaction);
      throw new Error(err);
    }
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehicleService.findOne({id});
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateVehicleDto) {
    const transaction = await this.transaction.startTransaction();
    try {
      const data = this.vehicleService.update({id, body, transaction});
      await this.transaction.commitTransaction(transaction);
      return data;
    } catch (err){
      await this.transaction.rollbackTransaction(transaction);
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const transaction = await this.transaction.startTransaction();
    try {
      const data = this.vehicleService.delete({id, transaction});
      await this.transaction.commitTransaction(transaction);
      return data;
    } catch (err){
      await this.transaction.rollbackTransaction(transaction);
      throw err;
    }
  }
}
