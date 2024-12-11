import { InjectModel } from '@nestjs/sequelize';
import { User } from '../model/user.entity';
import { Op } from 'sequelize';
import { UserFindByDto } from '../client_user/dto/user-find-by.dto';
import { UserUpdateDto } from '../client_user/dto/user-update.dto';
import { Role } from '../../roles/role.entity';

export class AdminUserRepository {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  private attribute = ['id', 'username', 'email', 'phone', 'gender'];
  private attributeFindOneByLogin = ['id', 'username', 'email', 'password', 'phone', 'gender'];
  private attributeUserExist = ['id'];

  async findOneByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({
      where: { [Op.or]: [{ email: login }] },
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
      order: [['createdAt', sort]],
      attributes: this.attribute,
    });
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

  async userExist(id: number): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { id }, attributes: this.attributeUserExist });
    return !!user;
  }
}
