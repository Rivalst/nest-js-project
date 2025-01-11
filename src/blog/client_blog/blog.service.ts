import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { FindAllBlogQueryDto } from './dto/find-all-blog-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CategoryRepository } from '../../category/client_category/category.repository';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async findAll(dto: FindAllBlogQueryDto) {
    return await this.blogRepository.findAll(dto);
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async create(dto: CreateBlogDto, userId: number) {
    const existingBlog = await this.blogRepository.findOneByName(dto.name);
    if (existingBlog) {
      throw new ConflictException('Blog with this name already exists');
    }

    const existingCategories = await this.categoryRepository.findAll(dto);

    if (existingCategories.length !== dto.categoryIds.length) {
      throw new NotFoundException('Some categories do not exist');
    }

    const createdBlog = await this.blogRepository.create(dto, userId);

    return await this.blogRepository.findOne(createdBlog.id);
  }

  async update(dto: UpdateBlogDto, userId: number) {
    const blog = await this.blogRepository.findOne(dto.id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (userId !== blog.authorId) {
      throw new ForbiddenException("You don't have permission to update this blog");
    }

    const updatedBlog = await this.blogRepository.update(dto);

    if (updatedBlog.status !== 'success') {
      throw new NotFoundException('Blog not updated');
    }

    return await this.blogRepository.findOne(dto.id);
  }

  async remove(id: number, userId: number) {
    const blog = await this.blogRepository.findOne(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (userId !== blog.authorId) {
      throw new ForbiddenException("You don't have permission to delete this blog");
    }

    return await this.blogRepository.remove(id);
  }
}
