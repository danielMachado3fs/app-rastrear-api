import { PrimaryGeneratedColumn } from "typeorm";

export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;
}
