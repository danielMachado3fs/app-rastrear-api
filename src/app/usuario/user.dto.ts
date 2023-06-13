import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';
import { AdressDto } from '../../common/endereco';
import { Role } from '../grupo/entities/role.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsObject()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => Role)
  @ValidateNested()
  role: Role;

  @IsObject()
  @Type(() => AdressDto)
  @ValidateNested()
  adress: AdressDto;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}