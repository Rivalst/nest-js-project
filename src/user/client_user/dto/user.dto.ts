import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Gender } from '../../../common/constant/enums.enum';

export class UserDto {
  @MinLength(3)
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @MinLength(8)
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  gender: Gender;
}
