import { ApiProperty } from '@nestjs/swagger';
import { IsNumberOptionalPram } from '../decorators/is-number-pram.decorator';
import { IsStringOptionalPram } from '../decorators/is-string-pram.decorator';

export class UpdateProductDto {
  @IsStringOptionalPram('title')
  @ApiProperty({ type: String, description: 'product' })
  readonly title: string;

  @IsNumberOptionalPram('price')
  @ApiProperty({ type: Number })
  readonly price: number;
}
