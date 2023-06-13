import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../../common/timestamp-entity";
import { SituacaoChecklist, TypeChecklist, TypesVehicles, typesChecklist, typesVehicles } from "../../../common/types";
import { Vehicle } from "../../veiculo/entities/vehicle.entity";

export interface IOpcao {
  title: string;
  situacao: SituacaoChecklist;
  descricao?: string;
}

export interface IChecklistOptions{
  title: string;
}

export interface IChecklistVehicle {
  id?: number;
  vehicle: Vehicle;
  kmAtual: number;
  options: IOpcao[];
}

export interface IChecklist {
  id?: number;
  typeVehicle: TypesVehicles;
  options: IChecklistOptions[];
}

@Entity('checklist-vehicle')
export class ChecklistVehicle extends TimestampEntity implements IChecklistVehicle{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle: Vehicle;

  @Column()
  kmAtual: number;

  @Column({type: 'enum', enum: typesChecklist})
  type: TypeChecklist;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  options: IOpcao[];
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
