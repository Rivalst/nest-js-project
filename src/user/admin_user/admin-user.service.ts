import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../logger/logger.service';
import { User } from '../model/user.entity';
import { UserFindByDto } from '../client_user/dto/user-find-by.dto';
import { UserUpdateDto } from '../client_user/dto/user-update.dto';
import { AdminUserRepository } from './admin-user.repository';

@Injectable()
export class AdminUserService {
  constructor(
    private readonly adminUserRepository: AdminUserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('UserService');
  }

  async findAll(findByDto: UserFindByDto): Promise<User[]> {
    return await this.adminUserRepository.findAll(findByDto);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.adminUserRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, user: UserUpdateDto) {
    if (Object.keys(user).length === 0) {
      return this.findOne(id);
    }

    const updatedUser = await this.adminUserRepository.update(id, user);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: number) {
    await this.adminUserRepository.remove(id);
  }
}
