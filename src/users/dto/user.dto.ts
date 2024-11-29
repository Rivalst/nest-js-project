import { IsStringPram } from '../../products/decorators/is-string-pram.decorator';

export class UserDto {
  @IsStringPram('userId')
  userId: string;
  @IsStringPram('username')
  username: string;
}
