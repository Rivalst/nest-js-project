import { AdminCategoryService } from './admin-category.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesEnum } from '../../roles/roles.enum';
import { AuthGuard } from '../../auth/auth.guard';
import { RolesGuard } from '../../user/roles.guard';

@Controller('admin/categories')
@ApiTags('Admin Category')
@ApiBearerAuth()
@Roles(RolesEnum.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class AdminCategoryController {
  constructor(private readonly adminCategoryService: AdminCategoryService) {}

  @Get()
  async findAll() {
    return await this.adminCategoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.adminCategoryService.findOne(id);
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.adminCategoryService.create(dto);
  }

  @Patch()
  async update(@Body() dto: UpdateCategoryDto) {
    return await this.adminCategoryService.update(dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.adminCategoryService.remove(id);
  }
}
