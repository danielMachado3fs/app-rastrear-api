import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { EnderecoDto } from 'src/common/endereco';

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
  grupo: string

  @IsObject()
  @Type(() => EnderecoDto)
  @ValidateNested()
  endereco: EnderecoDto;
}
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
