import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @IsOptional()
  @ApiProperty({ type: String, description: 'product' })
  @IsString({ message: "'title' must be a string" })
  readonly title: string;
  @IsOptional()
  @ApiProperty({ type: Number })
  @IsNumber({}, { message: "'price' must be a number" })
  readonly price: number;
}
