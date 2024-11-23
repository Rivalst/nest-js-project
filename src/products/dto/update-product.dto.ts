import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString({ message: "'title' must be a string" })
  readonly title: string;
  @IsOptional()
  @IsNumber({}, { message: "'price' must be a number" })
  readonly price: number;
}
