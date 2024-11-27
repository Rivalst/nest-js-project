import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductsDto {
  @IsString({ message: "'title' must be a string" })
  @IsNotEmpty({ message: "title' is required" })
  @ApiProperty({ type: String, description: 'product' })
  readonly title: string;
  @ApiProperty({ type: Number })
  @IsNumber({}, { message: "'price' must be a number" })
  @IsNotEmpty({ message: "'price' is required" })
  readonly price: number;
}
