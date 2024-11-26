import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { CreateProductsDto } from '../dto/create-products.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getTotalCount(): Promise<number> {
    return this.productModel.countDocuments().exec();
  }

  async getProducts(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;
    return this.productModel.find().skip(skip).limit(limit).exec();
  }

  async getProductsWithPagination(page: number, limit: number) {
    const totalCount = await this.getTotalCount();
    const totalPages = Math.ceil(totalCount / limit);

    // TODO: Should i throw an error here or just return an empty array?
    // if (page > totalPages) {
    //   throw new BadRequestException(
    //     `Page ${page} exceeds total pages available (${totalPages}).`,
    //   );
    // }

    const items = await this.getProducts(page, limit);

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
    try {
      const newProduct = new this.productModel(product);
      return newProduct.save();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Failed to create product. Please check the input data.',
      );
    }
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