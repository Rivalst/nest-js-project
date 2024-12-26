import { CreateCategoryDto } from './create-category.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends CreateCategoryDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'category id' })
  id: number;
}
