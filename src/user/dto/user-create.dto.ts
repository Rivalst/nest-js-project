import { IsStringPram } from '../../products/decorators/is-string-pram.decorator';
import { MinLength } from 'class-validator';

export class UserCreateDto {
  @IsStringPram('username')
  username: string;
  @IsStringPram('password')
  @MinLength(8)
  password: string;
}
