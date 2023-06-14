import { Body, Controller, Inject, Param, Patch, Post, forwardRef } from '@nestjs/common';
import { TransactionService } from 'src/utils/transactions/transaction.service';
import { User } from '../usuario/entities/user.entity';
import { AuthDto, UpdatePasswordDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('signin')
export class AuthController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(forwardRef(() => TransactionService)) private readonly transactionService: TransactionService,
  ){}

  @Post('authenticate')
  async authenticate(@Body() body: AuthDto): Promise<User>{
    return await this.authService.authenticate(body);
  }

  @Patch(':id')
  async updatePassword(@Body() body: UpdatePasswordDto, @Param() id: number): Promise<boolean>{
    const transaction = await this.transactionService.startTransaction();
    try {
      const data = await this.authService.updatePassword({id, body, transaction});
      await this.transactionService.commitTransaction(transaction);
      return data;
    } catch (error) {
      await this.transactionService.rollbackTransaction(transaction);
      throw error;
    }
  }
}
