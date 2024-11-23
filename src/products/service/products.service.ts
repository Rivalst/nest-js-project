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

  // TODO: Create pagination
  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
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
