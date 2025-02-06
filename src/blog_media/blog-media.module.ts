import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BlogMedia } from './model/blog-media.entity';
import { BlogMediaRepository } from './clien_blog_media/blog-media.repository';

@Module({
  imports: [SequelizeModule.forFeature([BlogMedia])],
  providers: [BlogMediaRepository],
  controllers: [],
  exports: [BlogMediaRepository],
})
export class BlogMediaModule {}
