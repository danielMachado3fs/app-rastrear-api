import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../../common/timestamp-entity";
import { SituacaoChecklist } from "../../../common/types";
import { Vehicle } from "../../veiculo/entities/vehicle.entity";

export interface IOpcao {
  situacao: SituacaoChecklist;
  descricao?: string;
}

export interface IChecklistOptions{
  situacao: "entrada" | "saida";
  pneus: IOpcao;
  lampadasExternas: IOpcao;
  nivelOleo: IOpcao;
  carroceria: IOpcao;
  limpadorParabrisa: IOpcao;
  vidros: IOpcao;
}

export interface IChecklist {
  id: number;
  vehicle: Vehicle;
  kmAtual: number;
  options: IChecklistOptions;
}

@Entity('checklist')
export class Checklist extends TimestampEntity implements IChecklist{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.id)
  vehicle: Vehicle;

  @Column()
  kmAtual: number;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  options: IChecklistOptions;
}
