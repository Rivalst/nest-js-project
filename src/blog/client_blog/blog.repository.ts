import { InjectModel } from '@nestjs/sequelize';
import { Blog } from '../model/blog.entity';
import { Category } from '../../category/model/category.entity';
import { User } from '../../user/model/user.entity';
import { Op, Transaction } from 'sequelize';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CategoryBlog } from '../../category/model/category-blog.entity';
import { NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

export class BlogRepository {
  constructor(@InjectModel(Blog) private readonly blogModel: typeof Blog) {}

  private attribute = ['id', 'name', 'description', 'likes', 'authorId'];
  private attributeForCategory = ['id', 'name'];
  private attributeForAuthor = ['id', 'username', 'email'];
  private attributeForCategoryExist = ['id'];

  private baseInclude = [
    { model: Category, through: { attributes: [] }, attributes: this.attributeForCategory },
    {
      model: User,
      attributes: this.attributeForAuthor,
    },
  ];

  async findAll(dto: FindAllQueryDto): Promise<Blog[]> {
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
    ];

    return await this.blogModel.findAll({
      attributes: this.attribute,
      include: include,
      where: where,
      limit,
      offset,
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

  async create(dto: CreateBlogDto, userId: number) {
    const transaction: Transaction = await this.blogModel.sequelize.transaction();

    try {
      const blog = await this.blogModel.create(
        {
          name: dto.name,
          description: dto.description,
          authorId: userId,
        },
        { transaction },
      );

      if (dto.categoryIds?.length) {
        // TODO: MOVE TO SERVICE
        const existingCategories = await Category.findAll({
          where: { id: dto.categoryIds },
          transaction,
        });

        // TODO: MOVE TO SERVICE
        if (existingCategories.length !== dto.categoryIds.length) {
          throw new NotFoundException('Some categories do not exist');
        }

        const categoryBlogRelations = dto.categoryIds.map(categoryId => ({
          blogId: blog.id,
          categoryId,
        }));

        //TODO: CHECK IF THIS WORKS!!!
        await CategoryBlog.bulkCreate(categoryBlogRelations, { transaction });
      }

      await transaction.commit();
      return blog;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(dto: UpdateBlogDto) {
    await this.blogModel.update(dto, { where: { id: dto.id } });
    return { status: 'success' };
  }

  async remove(id: number) {
    return await this.blogModel.destroy({ where: { id }, individualHooks: true });
  }

  async isBlogExist(id: number): Promise<boolean> {
    const blog = await this.blogModel.findOne({ where: { id }, attributes: this.attributeForCategoryExist });
    return !!blog;
  }
}
