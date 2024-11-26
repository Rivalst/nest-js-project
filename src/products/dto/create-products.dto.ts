import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsString({ message: "'title' must be a string" })
  @IsNotEmpty({ message: "title' is required" })
  readonly title: string;
  @IsNumber({}, { message: "'price' must be a number" })
  @IsNotEmpty({ message: "'price' is required" })
  readonly price: number;
}
