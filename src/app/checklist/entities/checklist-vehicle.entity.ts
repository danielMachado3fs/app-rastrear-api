import { SituacaoChecklist, TypeChecklist, typesChecklist } from "src/common/types";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../../common/timestamp-entity";
import { Vehicle } from "../../veiculo/entities/vehicle.entity";

export interface IOpcao {
  title: string;
  situacao: SituacaoChecklist;
  descricao?: string;
}

export interface IChecklistVehicle {
  id?: number;
  vehicle: Vehicle;
  kmAtual: number;
  options: IOpcao[];
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