import { InjectModel } from '@nestjs/sequelize';
import { Blog } from '../model/blog.entity';
import { Category } from '../../category/model/category.entity';
import { User } from '../../user/model/user.entity';
import { Op, Transaction } from 'sequelize';
import { FindAllBlogQueryDto } from './dto/find-all-blog-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CategoryBlog } from '../../category/model/category-blog.entity';
import { Sequelize } from 'sequelize-typescript';
import { BlogMedia } from '../../blog_media/model/blog-media.entity';

export class BlogRepository {
  constructor(
    @InjectModel(Blog) private readonly blogModel: typeof Blog,
    @InjectModel(CategoryBlog) private readonly categoryBlogModel: typeof CategoryBlog,
  ) {}

  private attribute = ['id', 'name', 'description', 'likes', 'authorId'];
  private attributeForCategory = ['id', 'name'];
  private attributeForAuthor = ['id', 'username', 'email'];
  private attributeForCategoryExist = ['id'];
  private attributeForMedia = ['id', 'name', 'url', 'blogId'];

  private baseInclude = [
    { model: Category, through: { attributes: [] }, attributes: this.attributeForCategory },
    { model: User, attributes: this.attributeForAuthor },
    { model: BlogMedia, attributes: this.attributeForMedia },
  ];

  async findAll(dto: FindAllBlogQueryDto): Promise<Blog[]> {
    const { limit = 10, offset = 0, categoryId, search } = dto;

    const nameCondition = search ? { name: { [Op.iLike]: `%${search}%` } } : {};

    const where: any = {
      ...nameCondition,
      ...(categoryId
        ? {
            id: {
              [Op.in]: Sequelize.literal(`(
              SELECT "category_blogs"."blog_id"
              FROM "category_blogs"
              WHERE "category_blogs"."category_id" = ${categoryId}
            )`),
            },
          }
        : {}),
    };

    const include = [
      {
        model: Category,
        through: { attributes: [] },
        attributes: this.attributeForCategory,
        // ...(categoryId ? { where: { id: categoryId } } : {}),
      },
      {
        model: User,
        attributes: this.attributeForAuthor,
      },
      { model: BlogMedia, attributes: this.attributeForMedia },
    ];

    return await this.blogModel.findAll({
      attributes: this.attribute,
      include: include,
      where: where,
      limit,
      offset,
      // TODO: FIX AND WRItE INTRSEPTOR TO REMOVE THIS FROM RESPONSE
      // order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number): Promise<Blog> {
    return await this.blogModel.findByPk(id, {
      attributes: this.attribute,
      include: this.baseInclude,
    });
  }

  async findOneByName(name: string): Promise<Blog> {
    return await this.blogModel.findOne({ where: { name }, attributes: this.attribute });
  }

  async create(dto: CreateBlogDto, userId: number, transaction?: Transaction) {
    const blog = await this.blogModel.create(
      {
        name: dto.name,
        description: dto.description,
        authorId: userId,
      },
      { transaction },
    );

    await this.createCategoriesDependency(dto.categoryIds, blog.id, transaction);

    return blog;
  }

  async update(dto: UpdateBlogDto, transaction?: Transaction) {
    await this.blogModel.update(dto, { where: { id: dto.id }, transaction });
    return { status: 'success' };
  }

  async remove(id: number, transaction?: Transaction) {
    return await this.blogModel.destroy({ where: { id }, individualHooks: true, transaction });
  }

  async isBlogExist(id: number): Promise<boolean> {
    const blog = await this.blogModel.findOne({ where: { id }, attributes: this.attributeForCategoryExist });
    return !!blog;
  }

  private async createCategoriesDependency(categoryIds: number[], blogId: number, transaction: Transaction) {
    if (categoryIds?.length) {
      const categoryBlogRelations = categoryIds.map(categoryId => ({
        blogId: blogId,
        categoryId,
      }));

      await this.categoryBlogModel.bulkCreate(categoryBlogRelations, { transaction });
    }
  }
}
