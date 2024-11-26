import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductsQueryDto {
  @IsOptional()
  @Type(() => Number)
  // поменять на number
  @IsNumber()
  @Min(1)
  // не указывать явно
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit: number = 10;
}
