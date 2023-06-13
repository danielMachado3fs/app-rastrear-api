import { TypesStatus, typesStatus } from 'src/common/types';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Adress, IAdress } from '../../../common/endereco';
import { TimestampEntity } from '../../../common/timestamp-entity';
import { IRole, Role } from '../../grupo/entities/role.entity';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: IAdress;
  role: IRole;
}

@Entity('users')
export class User extends TimestampEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column(() => Adress, {prefix: false})
  address: Adress;

  @ManyToOne(() => Role,  (role) => role.id)
  role: Role;
  
  @Column({type: 'enum', enum: typesStatus, default: "ativo"})
  status: TypesStatus;
}
