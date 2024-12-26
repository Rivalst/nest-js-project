import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../model/category.entity';

export class CategoryRepository {
  constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {}

  async findAll() {
    return this.categoryModel.findAll();
  }
}
