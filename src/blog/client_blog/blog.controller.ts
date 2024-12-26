import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';
import { BlogService } from './blog.service';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CurrentUser } from '../../common/decorators/user.decorator';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
@ApiTags('Blogs')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async findAll(@Query() dto: FindAllQueryDto) {
    return this.blogService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id);
  }

  @Post()
  async create(@Body() dto: CreateBlogDto, @CurrentUser() user: any) {
    return this.blogService.create(dto, user.userId);
  }

  @Patch()
  async update(@Body() dto: UpdateBlogDto, @CurrentUser() user: any) {
    return this.blogService.update(dto, user.userId);
  }

  @Delete('id')
  async remove(@Param('id') id: number, @CurrentUser() user: any) {
    return this.blogService.remove(id, user.userId);
  }
}
