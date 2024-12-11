import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Gender } from '../../../user/enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserRegisterDto {
  @MinLength(3)
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  @MinLength(8)
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  @ApiProperty({ enum: Gender, description: 'gender' })
  gender: Gender;
}
