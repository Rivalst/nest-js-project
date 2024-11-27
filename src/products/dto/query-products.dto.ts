import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ProductsQueryDto {
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  @IsOptional()
  @IsNumber()
  page: number;

  @Type(() => Number)
  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @IsOptional()
  limit: number;
}
