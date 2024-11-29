import { IsStringPram } from '../../products/decorators/is-string-pram.decorator';
import { MinLength } from 'class-validator';

export class AuthUserRegisterDto {
  @MinLength(3)
  @IsStringPram('username')
  username: string;
  @MinLength(8)
  @IsStringPram('password')
  password: string;
}
