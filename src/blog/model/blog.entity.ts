import { BeforeDestroy, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/model/user.entity';
import { Category } from '../../category/model/category.entity';
import { CategoryBlog } from '../../category/model/category-blog.entity';
import { BlogMedia } from '../../blog_media/model/blog-media.entity';

@Table({ tableName: 'blogs', timestamps: true, paranoid: true })
export class Blog extends Model<Blog> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  likes: number;

  @BelongsToMany(() => Category, () => CategoryBlog)
  categories: Category[];

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @HasOne(() => BlogMedia)
  blogMedia: BlogMedia;

  @BeforeDestroy
  static async updateUniqueFieldsBeforeDelete(blog: Blog) {
    const currentDate = new Date().toISOString();

    blog.name = `${blog.name}_deleted_${currentDate}`;
    blog.description = `${blog.description}_deleted_${currentDate}`;
    await blog.save({ hooks: false });
  }
}
