import { IsArray, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllCategoryDto {
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  @ApiProperty({ type: [Number], description: 'category ids' })
  categoryIds?: number[];
}
