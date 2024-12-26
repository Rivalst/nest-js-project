import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllQueryDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @ApiProperty({ type: Number, default: 10 })
  limit?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  offset?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @ApiProperty({ type: Number, default: undefined })
  categoryId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, default: undefined })
  search?: string;
}
