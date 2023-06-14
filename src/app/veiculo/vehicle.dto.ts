import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TypesStatus, TypesVehicles, typesStatus, typesVehicles } from 'src/common/types';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  model: string;
  
  @IsString()
  @IsNotEmpty()
  yearManufacture: string;
  
  @IsString()
  @IsNotEmpty()
  plate: string;
  
  @IsDate()
  @IsNotEmpty()
  dateAcquisition: Date;

  @IsEnum(typesVehicles)
  @IsString()
  @IsNotEmpty()
  type: TypesVehicles;

  @IsEnum(typesStatus)
  @IsString()
  @IsOptional()
  status?: TypesStatus;
  
  @IsString()
  @IsOptional()
  image?: string;
}

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}