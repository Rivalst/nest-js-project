import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthEmailUserSignInDto {
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;
}
