import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { EnderecoDto } from 'src/common/endereco';
import { Match } from 'src/decorators/match.decorator';
import { Grupo } from '../grupo/entities/grupo.entity';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  senha: string;

  @IsObject()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => Grupo)
  @ValidateNested()
  grupo: Grupo;

  @IsObject()
  @Type(() => EnderecoDto)
  @ValidateNested()
  endereco: EnderecoDto;
}
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}

export class AlterarSenhaDto {
  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsNotEmpty()
  @Match('senha')
  senhaConfirmacao: string;
}