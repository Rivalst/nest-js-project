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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../common/decorators/api-ok-pagination-response-products.decorator';
import { ApiBadBaseRequestResponse } from '../../common/decorators/api-bad-base-request-response.decorator';
import { Product } from '../schemas/product.schema';
import { Public } from '../../common/constant/constant';

@Controller('products')
@ApiBadBaseRequestResponse()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('ProductsController');
  }

  @Public()
  @Get()
  // example own decorator for swagger
  @ApiOkResponse({ type: Product })
  @ApiPaginatedResponse()
  async getProducts(
    // @Query('page', ParseOptionalIntPipe) page: number = 1,
    // @Query('limit', ParseOptionalIntPipe) limit: number = 10,
    @Query() query: ProductsQueryDto,
  ) {
    const { page, limit } = query;
    return this.productsService.getProductsWithPagination(page, limit);
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: Product })
  getByID(@Param('id') id: string) {
    return this.productsService.getByID(id);
  }

  // example swagger body
  @ApiCreatedResponse({ type: Product })
  @Post()
  async createProduct(@Body() createProductsDto: CreateProductsDto) {
    return this.productsService.create(createProductsDto);
  }

  @Put(':id')
  @ApiOkResponse({ type: Product })
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Product })
  async removeProduct(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
