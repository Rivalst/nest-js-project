import { InjectModel } from '@nestjs/sequelize';
import { BlogMedia } from '../model/blog-media.entity';
import { CreateBlogMediaDto } from './dto/create-blog-media.dto';
import { Transaction } from 'sequelize';

export class BlogMediaRepository {
  constructor(@InjectModel(BlogMedia) private readonly blogMediaModel: typeof BlogMedia) {}

  private attribute = ['id', 'name', 'url', 'blogId'];

  async findOne(id: number): Promise<BlogMedia> {
    return await this.blogMediaModel.findByPk(id, { attributes: this.attribute });
  }

  // async findAll(): Promise<BlogMedia[]> {
  //   return await this.blogMediaModel.findAll({ attributes: this.attribute });
  // }

  async create(dto: CreateBlogMediaDto, transaction?: Transaction) {
    await this.blogMediaModel.create(
      {
        name: dto.name,
        url: dto.url,
        key: dto.key,
        blogId: dto.blogId,
      },
      { transaction },
    );
  }

  async remove(id: number): Promise<void> {
    await this.blogMediaModel.destroy({ where: { id } });
  }
}
