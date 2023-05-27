import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsArray()
  permissions: string[]
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
