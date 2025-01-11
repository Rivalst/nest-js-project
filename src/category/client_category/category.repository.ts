import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../model/category.entity';
import { FindAllCategoryDto } from './dto/find-all.dto';

export class CategoryRepository {
  constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {}

  async findAll(dto?: FindAllCategoryDto) {
    const where = dto.categoryIds ? { id: dto.categoryIds } : {};

    return this.categoryModel.findAll({ where });
  }
}
