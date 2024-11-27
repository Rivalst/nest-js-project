import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductsQueryDto {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
