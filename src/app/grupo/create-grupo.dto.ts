import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGrupoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsArray()
  permissoes: string[]
}

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {}
