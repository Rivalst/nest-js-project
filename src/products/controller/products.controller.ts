import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { CreateProductsDto } from '../dto/create-products.dto';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AppLogger } from '../../logger/logger.service';
import { ProductsQueryDto } from '../dto/query-products.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('ProductsController');
  }

  @Get()
  async getProducts(
    // @Query('page', ParseOptionalIntPipe) page: number = 1,
    // @Query('limit', ParseOptionalIntPipe) limit: number = 10,
    @Query() query: ProductsQueryDto,
  ) {
    const { page, limit } = query;
    return this.productsService.getProductsWithPagination(page, limit);
  }

  @Get(':id')
  getByID(@Param('id') id: string) {
    return this.productsService.getByID(id);
  }

  @Post()
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Put(':id')
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
