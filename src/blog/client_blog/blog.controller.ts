import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('blogs')
@ApiTags('Blogs')
@UseGuards(AuthGuard)
export class BlogController {
  @Get()
  async findAll() {}

  @Get(':id')
  async findOne() {}

  @Post()
  async create() {}

  @Patch()
  async update() {}

  @Delete()
  async remove() {}
}
