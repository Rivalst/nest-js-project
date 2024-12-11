import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Gender } from '../../enum/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @MinLength(3)
  @IsString({ message: 'username must be a string' })
  @IsOptional()
  @ApiProperty({ type: String, description: 'username' })
  username: string;

  // @MinLength(8)
  // @IsString({ message: 'password must be a string' })
  // @IsOptional()
  // password: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  @IsOptional()
  @ApiProperty({ enum: Gender, description: 'gender' })
  gender: Gender;
}
