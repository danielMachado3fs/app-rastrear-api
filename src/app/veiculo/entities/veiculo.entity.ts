import { TiposVeiculos, tiposVeiculos } from 'src/common/types';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

export interface IVeiculo {
  id?: number;
  modelo: string;
  anoFabricacao: string;
  placa: string;
  dataAquisicao: Date;
  tipo: TiposVeiculos;
}

@Entity('veiculos')
export class Veiculo implements IVeiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  modelo: string;

  @Column()
  anoFabricacao: string;

  @Column()
  placa: string;

  @Column()
  dataAquisicao: Date;

  @Column({type: 'enum', enum: tiposVeiculos})
  tipo: TiposVeiculos;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
