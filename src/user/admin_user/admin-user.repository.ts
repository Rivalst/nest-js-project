import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.entity';
import { Op } from 'sequelize';
import { UserFindByDto } from '../client_user/dto/user-find-by.dto';
import { UserUpdateDto } from '../client_user/dto/user-update.dto';
import { Role } from '../model/role.entity';

export class AdminUserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  private attribute = ['id', 'username', 'email', 'phone', 'gender'];
  private attributeFindOneByLogin = ['id', 'username', 'email', 'password', 'phone', 'gender'];

  async findOneByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({
      where: { [Op.or]: [{ email: login }, { phone: login }] },
      attributes: this.attributeFindOneByLogin,
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id }, attributes: this.attribute });
  }

  async findAll(findByDto: UserFindByDto): Promise<User[]> {
    const sort = findByDto.sort === 'new' ? 'DESC' : 'ASC';

    const findBy = findByDto.find ?? '';
    findBy.trim();
    return await this.userModel.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${findBy}%` } },
          { email: { [Op.iLike]: `%${findBy}%` } },
          { phone: { [Op.iLike]: `%${findBy}%` } },
        ],
      },
      order: [['createdAt', sort]],
      attributes: this.attribute,
    });
  }

  async update(id: number, newUser: UserUpdateDto): Promise<User> {
    await this.userModel.update(newUser, {
      where: { id: id },
    });
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.userModel.destroy({ where: { id } });
  }
}
