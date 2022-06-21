import { IsEmail, IsString } from 'class-validator';

export class AuthRegistrationDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsEmail()
  email: string;
}
export class AuthLoginDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
