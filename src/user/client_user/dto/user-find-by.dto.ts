import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UserFindByDto {
  @IsString({ message: 'findBy must be a string' })
  @MaxLength(255, { message: 'findBy must be less than 255 characters' })
  @IsOptional()
  readonly find?: string;
}
