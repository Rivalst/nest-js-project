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
  Query,
} from '@nestjs/common';

import { CreateProductsDto } from '../dto/create-products.dto';
import { ProductsService } from '../service/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ParseOptionalIntPipe } from '../../../util/pipe/parce-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Usage example for a query dto
  // @Get()
  // async getProducts(@Query() query: ProductsQueryDto) {
  //   const { page, limit } = query;
  //
  //   const items = await this.productsService.getProducts(page, limit);
  //   const totalCount = await this.productsService.getTotalCount();
  //   const totalPages = Math.ceil(totalCount / limit);
  //
  //   return {
  //     items,
  //     pagination: {
  //       totalItems: totalCount,
  //       totalPages,
  //       currentPage: page,
  //       perPage: limit,
  //     },
  //   };
  // }

  @Get()
  async getProducts(
    @Query('page', ParseOptionalIntPipe) page: number = 1,
    @Query('limit', ParseOptionalIntPipe) limit: number = 10,
  ) {
    return this.productsService.getProductsWithPagination(page, limit);
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
