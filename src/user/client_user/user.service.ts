import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../../logger/logger.service';
import { User } from '../model/user.entity';
import { UserRepository } from './user.repository';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserFindByDto } from './dto/user-find-by.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('UserService');
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAll(findByDto: UserFindByDto): Promise<User[]> {
    return await this.userRepository.findAll(findByDto);
  }

  async update(id: number, user: UserUpdateDto) {
    if (Object.keys(user).length === 0) {
      return this.findOne(id);
    }

    const updatedUser = await this.userRepository.update(id, user);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: number) {
    await this.userRepository.remove(id);
  }
}
