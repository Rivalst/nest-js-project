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

  async findAll(dto: UserFindByDto): Promise<User[]> {
    return await this.userRepository.findAll(dto);
  }

  async update(id: number, user: UserUpdateDto) {
    const userExist = await this.userRepository.userExist(id);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    if (Object.keys(user).length === 0) {
      return this.userRepository.findOne(id);
    }

    const updatedUser = await this.userRepository.update(id, user);
    if (updatedUser.status !== 'success') {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.findOne(id);
  }

  async remove(id: number) {
    const userExist = await this.userRepository.userExist(id);
    if (!userExist) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(id);
  }
}
