import { BeforeDestroy, BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { Blog } from '../../blog/model/blog.entity';
import { CategoryBlog } from './category-blog.entity';

@Table({ tableName: 'categories', timestamps: true, paranoid: true })
export class Category extends Model<Category> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @BelongsToMany(() => Blog, () => CategoryBlog)
  blogs: Blog[];

  @BeforeDestroy
  static async updateUniqueFieldsBeforeDelete(category: Category) {
    const currentDate = new Date().toISOString();

    category.name = `${category.name}_deleted_${currentDate}`;
    await category.save({ hooks: false });
  }
}
