import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllQueryDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @ApiPropertyOptional({ type: Number, default: 10 })
  limit?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @ApiPropertyOptional({ type: Number, default: 10 })
  offset?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  categoryId?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ type: Number })
  search?: string;
}
