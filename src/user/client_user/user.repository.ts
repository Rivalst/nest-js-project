import { User } from '../model/user.entity';
import { Op } from 'sequelize';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserFindByDto } from './dto/user-find-by.dto';
import { Role } from '../model/role.entity';
import { RolesEnum } from '../model/roles.enum';

export class UserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  private attribute = ['id', 'username', 'email', 'phone', 'gender'];
  private attributeFindOneByLogin = ['id', 'username', 'email', 'password', 'phone', 'gender'];

  async findOneByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({
      where: { [Op.or]: [{ email: login }] },
      attributes: this.attributeFindOneByLogin,
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.findOne({ where: { id }, attributes: this.attribute });
  }

  async findAll(dto: UserFindByDto): Promise<User[]> {
    const sort = dto.sort === 'new' ? 'DESC' : 'ASC';

    const findBy = dto.find?.trim();
    const where = findBy
      ? {
          [Op.or]: [
            { username: { [Op.iLike]: `%${findBy}%` } },
            { email: { [Op.iLike]: `%${findBy}%` } },
            { phone: { [Op.iLike]: `%${findBy}%` } },
          ],
        }
      : undefined;
    return await this.userModel.findAll({
      where: where,
      include: [
        {
          model: Role,
          where: { name: { [Op.notIn]: [RolesEnum.ADMIN] } },
          attributes: [],
          // is this necessary?
          through: { attributes: [] },
        },
      ],
      order: [['createdAt', sort]],
      attributes: this.attribute,
    });
  }

  async create(dto: UserDto): Promise<User> {
    return await this.userModel.create(dto);
  }

  async update(id: number, dto: UserUpdateDto) {
    await this.userModel.update(dto, {
      where: { id: id },
      returning: true,
    });
    // how to correct send signal that user was updated ?
    return { status: 'success' };
  }

  async remove(id: number) {
    return await this.userModel.destroy({ where: { id } });
  }
}
