import { Module } from '@nestjs/common';
import { BlogController } from './client_blog/blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './model/blog.entity';
import { BlogService } from './client_blog/blog.service';
import { BlogRepository } from './client_blog/blog.repository';
import { CategoryModule } from '../category/category.module';
import { CategoryBlog } from '../category/model/category-blog.entity';
import { BlogMediaModule } from '../blog_media/blog-media.module';
import { DmsModule } from '../dms/dms.module';

@Module({
  imports: [CategoryModule, BlogMediaModule, DmsModule, SequelizeModule.forFeature([Blog, CategoryBlog])],
  providers: [BlogService, BlogRepository],
  controllers: [BlogController],
})
export class BlogModule {}
