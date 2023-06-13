import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { TypesStatus, TypesVehicles, typesStatus, typesVehicles } from '../../../common/types';
import { Checklist, ChecklistVehicle } from '../../checklist/entities/checklist.entity';

export interface IVehicle {
  id?: number;
  model: string;
  yearManufacture: string;
  plate: string;
  dateAcquisition: Date;
  type: TypesVehicles;
  status: TypesStatus;
  image?: string;
}

@Entity('vehicles')
export class Vehicle implements IVehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  yearManufacture: string;

  @Column()
  plate: string;

  @Column()
  dateAcquisition: Date;

  @Column({type: 'enum', enum: typesVehicles})
  type: TypesVehicles;

  @Column({type: 'enum', enum: typesStatus})
  status: TypesStatus;

  @Column({nullable: true, default: null})
  imagem: string;

  @OneToMany(() => ChecklistVehicle, (checklist) => checklist.vehicle)
  checklist: Checklist[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
