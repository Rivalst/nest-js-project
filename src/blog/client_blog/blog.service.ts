import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { FindAllBlogQueryDto } from './dto/find-all-blog-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CategoryRepository } from '../../category/client_category/category.repository';
import { BlogMediaRepository } from '../../blog_media/clien_blog_media/blog-media.repository';
import { DmsService } from '../../dms/dms.service';
import { Sequelize } from 'sequelize-typescript';
import { InjectConnection } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { BlogMedia } from '../../blog_media/model/blog-media.entity';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly blogMediaRepository: BlogMediaRepository,
    private readonly dmsService: DmsService,
    @InjectConnection() private readonly sequelize: Sequelize,
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

  async create(dto: CreateBlogDto, userId: number, file: Express.Multer.File) {
    const blogId = await this.sequelize.transaction(async transaction => {
      const existingBlog = await this.blogRepository.findOneByName(dto.name);
      if (existingBlog) {
        throw new ConflictException('Blog with this name already exists');
      }

      const existingCategories = await this.categoryRepository.findAll(dto);

      if (existingCategories.length !== dto.categoryIds.length) {
        throw new NotFoundException('Some categories do not exist');
      }

      const createdBlog = await this.blogRepository.create(dto, userId, transaction);

      await this.createMedia(createdBlog.id, file, transaction);

      return createdBlog.id;
    });
    return await this.blogRepository.findOne(blogId);
  }

  async update(dto: UpdateBlogDto, userId: number, file?: Express.Multer.File) {
    const blog = await this.blogRepository.findOne(dto.id);
    const blogMedia = await this.blogMediaRepository.findOne(blog.id);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    if (userId !== blog.authorId) {
      throw new ForbiddenException("You don't have permission to update this blog");
    }

    await this.sequelize.transaction(async transaction => {
      await this.updateBlogMedia(blog.id, transaction, file, blogMedia);

      const updatedBlog = await this.blogRepository.update(dto, transaction);

      if (updatedBlog.status !== 'success') {
        throw new NotFoundException('Blog not updated');
      }
    });

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

  private async createMedia(blogId: number, file: Express.Multer.File, transaction: Transaction) {
    let media: any;
    try {
      media = await this.dmsService.uploadSingleFile({ file: file, isPublic: true });

      await this.blogMediaRepository.create(
        {
          blogId: blogId,
          name: media.name,
          key: media.key,
          url: media.url,
        },
        transaction,
      );
    } catch (error) {
      if (media) {
        await this.dmsService.deleteFile(media.key);
      }
      throw error;
    }
  }

  private async updateBlogMedia(blogId: number, transaction: Transaction, file?: Express.Multer.File, blogMedia?: BlogMedia) {
    if (file) {
      if (blogMedia) {
        await this.dmsService.deleteFile(blogMedia.key);
        await this.blogRepository.remove(blogMedia.id, transaction);
      }
      await this.createMedia(blogId, file, transaction);
    }
  }
}
