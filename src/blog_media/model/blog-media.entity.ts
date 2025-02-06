import { BeforeDestroy, BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Blog } from '../../blog/model/blog.entity';

@Table({ tableName: 'blog_medias', timestamps: true, paranoid: true })
export class BlogMedia extends Model<BlogMedia> {
  @Column({ type: DataType.STRING, allowNull: false })
  url: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  key: string;

  @ForeignKey(() => Blog)
  @Column({ type: DataType.INTEGER, allowNull: false })
  blogId: number;

  @BelongsTo(() => Blog)
  blog: Blog;

  @BeforeDestroy
  static async updateUniqueFieldsBeforeDelete(blogMedia: BlogMedia) {
    const currentDate = new Date().toISOString();

    blogMedia.name = `${blogMedia.name}_deleted_${currentDate}`;
    blogMedia.name = `${blogMedia.name}_deleted_${currentDate}`;
    await blogMedia.save({ hooks: false });
  }
}
