import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    type: 'json',
    nullable: true,
    default: null
  })
  permissoes: string;
}