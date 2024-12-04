import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Gender } from '../../../common/constant/enums.enum';

export class UserUpdateDto {
  @MinLength(3)
  @IsString({ message: 'username must be a string' })
  @IsOptional()
  username: string;

  @MinLength(8)
  @IsString({ message: 'password must be a string' })
  @IsOptional()
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  @IsOptional()
  gender: Gender;
}
