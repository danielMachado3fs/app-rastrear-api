import { PartialType } from "@nestjs/mapped-types";

export class CreateGrupoDto {}

export class UpdateGrupoDto extends PartialType(CreateGrupoDto) {}
