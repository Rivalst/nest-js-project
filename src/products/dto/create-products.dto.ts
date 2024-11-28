import { ApiProperty } from '@nestjs/swagger';
import { IsStringPram } from '../decorators/is-string-pram.decorator';
import { IsNumberPram } from '../decorators/is-number-pram.decorator';

export class CreateProductsDto {
  @IsStringPram('title')
  @ApiProperty({ type: String, description: 'product' })
  readonly title: string;
  @ApiProperty({ type: Number })
  @IsNumberPram('price')
  readonly price: number;
}
