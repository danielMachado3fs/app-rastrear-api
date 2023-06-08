import { Injectable, Logger } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { connectionSource } from '../../config/database.providers';

export interface QueryRunnerFile {
  origem: string,
  destino: string,
  file: File
}

@Injectable()
export class TransactionService {
  private readonly logger = new Logger('TransactionService');

  /**
   * TRANSACTION TYPEORM
   */
  async startTransaction(): Promise<QueryRunner> {
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    return queryRunner;
  }

  async commitTransaction(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('commitTransaction', queryRunner.data);
    await queryRunner.commitTransaction();
    await queryRunner.release();
  }

  async rollbackTransaction(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
    await queryRunner.release();
  }
}
