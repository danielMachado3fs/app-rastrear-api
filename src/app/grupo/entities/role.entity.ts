import { TimestampEntity } from "src/common/timestamp-entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export interface IRole{
  id?: number;
  name: string;
  permissions: string[]
}

@Entity('roles')
export class Role extends TimestampEntity implements IRole{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'simple-array',
    nullable: true,
    default: null
  })
  permissions: string[];
}