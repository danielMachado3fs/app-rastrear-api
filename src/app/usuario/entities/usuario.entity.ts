import { Endereco, IEndereco } from 'src/common/endereco';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Grupo, IGrupo } from '../../grupo/entities/grupo.entity';

export interface IUsuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  endereco: IEndereco;
  grupo: IGrupo;
}

@Entity('usuarios')
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column(() => Endereco, {prefix: false})
  endereco: Endereco;

  @ManyToOne(() => Grupo,  (grupo) => grupo.id)
  grupo: Grupo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
