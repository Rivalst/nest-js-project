import { Injectable, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../logger/logger.service';
import { User } from './user.entity';
import { UserRepository } from './repository/user.repository';
import { UserUpdateDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext('UserService');
  }

  async findOne(value: string): Promise<User> {
    const user = await this.userRepository.findOne(value);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // TODO: Is this a better method for remove a password field?
    const userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async findAll(value: string, sort: 'old' | 'new'): Promise<User[]> {
    return await this.userRepository.findAll(value, sort);
  }

  async update(id: number, user: UserUpdateDto) {
    if (Object.keys(user).length === 0) {
      return this.findOne(id.toString());
    }

    const updatedUser = await this.userRepository.update(id, user);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    // TODO: Is this a better method for remove a password field?
    const userWithoutPassword = updatedUser.get({ plain: true });
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async remove(id: number) {
    await this.userRepository.remove(id);
  }
}
