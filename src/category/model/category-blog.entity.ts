import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Category } from './category.entity';
import { Blog } from '../../blog/model/blog.entity';

@Table({ tableName: 'category_blogs', timestamps: false })
export class CategoryBlog extends Model<CategoryBlog> {
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @ForeignKey(() => Blog)
  @Column
  blogId: number;

  @BelongsTo(() => Blog)
  blog: Blog;

  @BelongsTo(() => Category, { onDelete: 'CASCADE' })
  category: Category;
}
