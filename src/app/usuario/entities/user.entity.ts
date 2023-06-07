import { IRole, Role } from 'src/app/grupo/entities/role.entity';
import { Adress, IAdress } from 'src/common/endereco';
import { TimestampEntity } from 'src/common/timestamp-entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  adress: IAdress;
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
  adress: Adress;

  @ManyToOne(() => Role,  (role) => role.id)
  role: Role;
}
