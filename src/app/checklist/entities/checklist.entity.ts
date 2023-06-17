import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "../../../common/timestamp-entity";
import { TypesVehicles, typesVehicles } from "../../../common/types";

export interface IChecklistOptions{
  title: string;
  fileName: string;
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
    nullable: true,
    default: null
  })
  options: IChecklistOptions[];

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  commonOptions: IChecklistOptions[];
}

export const commonOptions = [
  {
    "fileName": "commonPneus",
    "title": "Pneus calibrados e em bom estado?"
  },
  {
    "fileName": "commonFluidos",
    "title": "Níveis de óleo, água e fluidos normais?"
  },
  {
    "fileName": "commonParabrisa",
    "title": "Limpadores de para-brisa funcionando corretamente?"
  },
  {
    "fileName": "commonIluminacao",
    "title": "Faróis, lanternas e luzes de freio em bom funcionamento?"
  }
]
