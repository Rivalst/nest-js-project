import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryController } from './client_category/category.controller';
import { AdminCategoryController } from './admin_category/admin-category.controller';
import { CategoryService } from './client_category/category.service';
import { AdminCategoryService } from './admin_category/admin-category.service';
import { CategoryRepository } from './client_category/category.repository';
import { AdminCategoryRepository } from './admin_category/admin-category.repository';
import { Category } from './model/category.entity';
import { User } from '../user/model/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Category])],
  controllers: [CategoryController, AdminCategoryController],
  providers: [CategoryService, AdminCategoryService, CategoryRepository, AdminCategoryRepository],
  exports: [CategoryRepository, AdminCategoryRepository],
})
export class CategoryModule {}
