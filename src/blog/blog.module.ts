import { Module } from '@nestjs/common';
import { BlogController } from './client_blog/blog.controller';

@Module({
  imports: [],
  controllers: [BlogController],
})
export class BlogModule {}
