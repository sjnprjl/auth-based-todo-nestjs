import { IsEmail } from 'class-validator';

export class AuthRegistrationDto {
  username: string;
  password: string;
  @IsEmail()
  email: string;
}
export class AuthLoginDto {
  username: string;
  password: string;
}
