import { IsStringPram } from '../products/decorators/is-string-pram.decorator';

export class AuthUserRegisteredDto {
  @IsStringPram('userId')
  userId: string;
  @IsStringPram('username')
  username: string;
}
