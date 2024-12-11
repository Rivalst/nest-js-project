import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthEmailUserSignInDto {
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty({ type: String, description: 'email' })
  email: string;
}
