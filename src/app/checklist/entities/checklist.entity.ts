import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../../common/timestamp-entity";
import { TypesVehicles, typesVehicles } from "../../../common/types";

export interface IChecklistOptions{
  title: string;
}

export interface IChecklist {
  id?: number;
  typeVehicle: TypesVehicles;
  options: IChecklistOptions[];
}

@Entity('checklist')
export class Checklist extends TimestampEntity implements IChecklist{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'enum', enum: typesVehicles})
  typeVehicle: TypesVehicles;

  @Column({
    type: 'json',
    nullable: false,
    default: []
  })
  options: IChecklistOptions[];
}
