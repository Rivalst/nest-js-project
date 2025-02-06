import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/model/user.entity';
import { UserRole } from '../user/model/user-role.entity';
import { Role } from '../roles/role.entity';
import { Blog } from '../blog/model/blog.entity';
import { Category } from '../category/model/category.entity';
import { CategoryBlog } from '../category/model/category-blog.entity';
import { BlogMedia } from '../blog_media/model/blog-media.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: 'postgres',
      define: {
        underscored: true,
      },
      models: [User, UserRole, Role, Blog, Category, CategoryBlog, BlogMedia],
      synchronize: true,
      autoLoadModels: true,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
