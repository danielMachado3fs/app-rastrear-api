import { Global, Module, forwardRef } from '@nestjs/common';
import { DatabaseModule } from '../../config/database.module';
import { databaseProviders } from '../../config/database.providers';
import { TransactionService } from './transaction.service';

@Global()
@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [],
  providers: [...databaseProviders, TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
