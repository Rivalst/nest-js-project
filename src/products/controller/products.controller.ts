import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateProductsDto } from '../dto/create-products.dto';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':id')
  getByID(@Param('id') id: string) {
    return this.productsService.getByID(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
