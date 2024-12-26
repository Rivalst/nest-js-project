import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../model/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export class AdminCategoryRepository {
  constructor(@InjectModel(Category) private readonly categoryModel: typeof Category) {}

  private attribute = ['id', 'name'];
  private attributeForCategoryExist = ['id'];

  async findAll() {
    console.log('in repo');
    return this.categoryModel.findAll({ attributes: this.attribute });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryModel.findByPk(id, { attributes: this.attribute });
  }

  async findOneByName(name: string): Promise<Category> {
    return await this.categoryModel.findOne({ where: { name }, attributes: this.attribute });
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryModel.create(dto);
  }

  async update(dto: UpdateCategoryDto) {
    await this.categoryModel.update({ name: dto.name }, { where: { id: dto.id } });

    return { status: 'success' };
  }

  async remove(id: number) {
    return await this.categoryModel.destroy({ where: { id }, individualHooks: true });
  }

  async isCategoryExist(id: number): Promise<boolean> {
    const category = await this.categoryModel.findOne({ where: { id }, attributes: this.attributeForCategoryExist });
    return !!category;
  }
}
