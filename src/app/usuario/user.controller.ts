import {
  Body,
  Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, forwardRef
} from '@nestjs/common';
import { TransactionService } from '../../utils/transactions/transaction.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
    @Inject(forwardRef(() => TransactionService)) private readonly transaction: TransactionService,
    ) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    const transaction = await this.transaction.startTransaction();
    try{
      return this.userService.create({body, transaction});
    }catch(err){
      throw new Error(err);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne({id});
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    const transaction = await this.transaction.startTransaction();
    try {
      const data = this.userService.update({id, body, transaction});
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
      const data = this.userService.delete({id, transaction});
      await this.transaction.commitTransaction(transaction);
      return data;
    } catch (err){
      await this.transaction.rollbackTransaction(transaction);
      throw err;
    }
  }
}
