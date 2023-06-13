import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Match } from "../../decorators/match.decorator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;
}