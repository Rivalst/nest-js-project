import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { Gender } from '../../common/constant/enums.enum';

export class AuthUserRegisteredDto {
  @IsNumber({}, { message: 'id must be a number' })
  @IsNotEmpty({ message: 'id is required' })
  id: number;

  @MinLength(3)
  @IsString({ message: 'username must be a string' })
  username: string;

  @MinLength(8)
  @IsString({ message: 'password must be a string' })
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsPhoneNumber('UA')
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'gender must be either male or female',
  })
  gender: Gender;
}
