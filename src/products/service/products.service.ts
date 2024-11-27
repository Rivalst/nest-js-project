import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductsDto } from '../dto/create-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { AppLogger } from '../../logger/logger.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('ProductsService');
  }

  async getTotalCount(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async getProducts(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;
    return this.productModel.find().skip(skip).limit(limit).exec();
  }

  async getProductsWithPagination(page: number, limit: number) {
    const totalCount = await this.getTotalCount();
    const totalPages = Math.ceil(totalCount / (limit ?? totalCount));

    let items = [];

    if (page <= totalPages || page === undefined) {
      items = await this.getProducts(page, limit);
    }

    return {
      items,
      pagination: {
        totalItems: totalCount,
        pageItems: items.length,
        currentPage: page,
        perPage: totalPages,
      },
    };
  }

  async getByID(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(product: CreateProductsDto): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const product = await this.productModel.findByIdAndDelete(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }
    return product;
  }
}
