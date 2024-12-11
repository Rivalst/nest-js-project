import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserFindByDto {
  @IsString({ message: 'findBy must be a string' })
  @MaxLength(255, { message: 'findBy must be less than 255 characters' })
  @IsOptional()
  @ApiProperty({ type: String, description: 'Find by', required: false })
  find?: string;

  @IsIn(['new', 'old'], { message: "sort must be either 'new' or 'old'" })
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  @IsString({ message: 'sort must be a string' })
  @MaxLength(255, { message: 'sort must be less than 255 characters' })
  @IsOptional()
  @ApiProperty({ type: String, description: 'sort', required: false })
  sort?: string;
}
