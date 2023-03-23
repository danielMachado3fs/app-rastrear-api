import { PartialType } from '@nestjs/mapped-types';

export class CreateUsuarioDto {}
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
