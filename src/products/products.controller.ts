import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { CreateProductsDto } from './create-products.dto';

@Controller('products')
export class ProductsController {
  @Get()
  getAll() {
    return 'All Products';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `Product with id ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return 'Product has been created.';
  }
}
