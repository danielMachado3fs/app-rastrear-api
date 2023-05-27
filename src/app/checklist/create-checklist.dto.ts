import { PartialType } from "@nestjs/mapped-types";

export class CreateChecklistDto {}
export class UpdateChecklistDto extends PartialType(CreateChecklistDto) {}
