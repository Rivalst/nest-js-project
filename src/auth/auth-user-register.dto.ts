import { IsStringPram } from '../products/decorators/is-string-pram.decorator';

export class AuthUserRegisterDto {
  @IsStringPram('username')
  username: string;
  @IsStringPram('password')
  password: string;
}
