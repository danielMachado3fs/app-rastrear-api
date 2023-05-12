import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export interface IGrupo{
  id?: number;
  nome: string;
  permissoes: string[]
}

@Entity('grupos')
export class Grupo implements IGrupo{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({
    type: 'simple-array',
    nullable: true,
    default: null
  })
  permissoes: string[];
  
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}