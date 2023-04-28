import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export interface IEndereco {
    logradouro: string;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    numero: string;
    complemento?: string;
}

export class Endereco implements IEndereco {
    @Column({length: 255, nullable: true, default: null})
    logradouro: string;
    @Column({length: 20, nullable: true, default: null})
    cep: string;
    @Column({length: 4, nullable: true, default: null})
    estado: string;
    @Column({length: 255, nullable: true, default: null})
    cidade: string;
    @Column({length: 255, nullable: true, default: null})
    bairro: string;
    @Column({length: 255, nullable: true, default: null})
    numero: string;
    @Column({ length: 255, nullable: true, default: null })
    complemento?: string;
}

export class EnderecoDto implements IEndereco {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['criar'] })
    @IsOptional({ groups: ['atualizar'] })
    logradouro: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty({ groups: ['criar'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.replace(/[^0-9]/g, ''))
    cep: string;

    @IsString()
    @MaxLength(4)
    @IsNotEmpty({ groups: ['criar'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    estado: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['criar'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    cidade: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['criar'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    bairro: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['criar'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    numero: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    @Transform(({ value }) => value?.toUpperCase())
    complemento?: string;
}
