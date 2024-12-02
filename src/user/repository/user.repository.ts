import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../common/constant';
import { User } from '../user.entity';
import { Op } from 'sequelize';
import { UserDto } from '../dto/user.dto';
import { UserUpdateDto } from '../dto/user-update.dto';

export class UserRepository {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: typeof User) {}

  async findOne(value: string): Promise<User> {
    const whereClause: any = {
      [Op.or]: [{ username: { [Op.iLike]: value } }, { email: value }, { phone: value }],
    };

    if (/^\d+$/.test(value)) {
      whereClause[Op.or].push({ id: parseInt(value, 10) });
    }
    return await this.userRepository.findOne<User>({ where: whereClause });
  }

  async findAll(value: string, sort: 'old' | 'new' = 'new'): Promise<User[]> {
    if (value.startsWith('+')) {
      value = value.replace(/^\+/, '');
    }
    const trimValue = value.trim();

    // const order = sort === 'old' ? [['createdAt', 'ASC']] : [['createdAt', 'DESC']];

    const whereClause: any = {
      [Op.or]: [
        { username: { [Op.iLike]: `%${trimValue}%` } },
        { email: { [Op.iLike]: `%${trimValue}%` } },
        { phone: { [Op.iLike]: `%${trimValue}%` } },
      ],
    };

    return await this.userRepository.findAll<User>({ where: whereClause });
  }

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async update(id: number, newUser: UserUpdateDto): Promise<User> {
    const [_, [updatedUser]] = await this.userRepository.update<User>(newUser, {
      where: { id: id },
      returning: true,
    });
    return updatedUser;
  }

  async remove(id: number) {
    return await this.userRepository.destroy({ where: { id } });
  }
}
