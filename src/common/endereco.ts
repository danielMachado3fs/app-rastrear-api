import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column } from 'typeorm';

export interface IAdress {
    street: string;
    cep: string;
    state: string;
    city: string;
    neighborhoods: string;
    number: string;
    complement?: string;
}

export class Adress implements IAdress {
    @Column({length: 255, nullable: true, default: null})
    street: string;
    @Column({length: 20, nullable: true, default: null})
    cep: string;
    @Column({length: 100, nullable: true, default: null})
    state: string;
    @Column({length: 255, nullable: true, default: null})
    city: string;
    @Column({length: 255, nullable: true, default: null})
    neighborhoods: string;
    @Column({length: 255, nullable: true, default: null})
    number: string;
    @Column({ length: 255, nullable: true, default: null })
    complement?: string;
}

export class AdressDto implements IAdress {
    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['create'] })
    @IsOptional({ groups: ['atualizar'] })
    street: string;

    @IsString()
    @MaxLength(20)
    @IsNotEmpty({ groups: ['create'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.replace(/[^0-9]/g, ''))
    cep: string;

    @IsString()
    @MaxLength(4)
    @IsNotEmpty({ groups: ['create'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    state: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['create'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    city: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['create'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    neighborhoods: string;

    @IsString()
    @MaxLength(255)
    @IsNotEmpty({ groups: ['create'] })
    @IsOptional({ groups: ['atualizar'] })
    @Transform(({ value }) => value?.toUpperCase())
    number: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    @Transform(({ value }) => value?.toUpperCase())
    complement?: string;
}
