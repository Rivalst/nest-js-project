import { Module } from '@nestjs/common';
import { BlogController } from './client_blog/blog.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from './model/blog.entity';
import { BlogService } from './client_blog/blog.service';
import { BlogRepository } from './client_blog/blog.repository';

@Module({
  imports: [SequelizeModule.forFeature([Blog])],
  providers: [BlogService, BlogRepository],
  controllers: [BlogController],
})
export class BlogModule {}
