import { AdminCategoryRepository } from './admin-category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class AdminCategoryService {
  constructor(private readonly adminCategoryRepository: AdminCategoryRepository) {}

  async findAll() {
    console.log('in service');
    return await this.adminCategoryRepository.findAll();
  }

  async findOne(id: number) {
    return await this.adminCategoryRepository.findOne(id);
  }

  async create(dto: CreateCategoryDto) {
    const existingCategory = await this.adminCategoryRepository.findOneByName(dto.name);
    if (existingCategory) {
      throw new ConflictException('Category with this name already exists');
    }

    const createdCategory = await this.adminCategoryRepository.create(dto);

    return await this.adminCategoryRepository.findOne(createdCategory.id);
  }

  async update(dto: UpdateCategoryDto) {
    const isCategoryExist = await this.isCategoryExist(dto.id);
    if (!isCategoryExist) {
      throw new ConflictException('Category not found');
    }

    const updatedCategory = await this.adminCategoryRepository.update(dto);
    if (updatedCategory.status !== 'success') {
      throw new ConflictException('Category not updated');
    }

    return await this.adminCategoryRepository.findOne(dto.id);
  }

  async remove(id: number) {
    const isCategoryExist = await this.isCategoryExist(id);
    if (!isCategoryExist) {
      throw new ConflictException('Category not found');
    }

    return await this.adminCategoryRepository.remove(id);
  }

  private async isCategoryExist(id: number) {
    return await this.adminCategoryRepository.isCategoryExist(id);
  }
}
