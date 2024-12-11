import { Table, Column, Model, DataType, BelongsToMany, AfterCreate, AfterDestroy } from 'sequelize-typescript';
import { Gender } from '../enum/gender.enum';
import { Role } from './role.entity';
import { UserRole } from './user-role.entity';
import { RolesEnum } from './roles.enum';

@Table({ tableName: 'users', timestamps: true, paranoid: true })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.ENUM, values: Object.values(Gender), allowNull: false })
  gender: Gender;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @AfterCreate
  static async assignDefaultUserRole(user: User) {
    const role = await Role.findOne({ where: { name: RolesEnum.USER } });
    if (role) {
      await UserRole.create({
        userId: user.id,
        roleId: role.id,
      });
    }
  }

  @AfterDestroy
  static async updateUniqueFieldsBeforeDelete(user: User) {
    const currentDate = new Date().toISOString();

    user.username = `${user.username}_deleted_${currentDate}`;
    user.email = `${user.email}_deleted_${currentDate}`;
    if (user.phone) {
      user.phone = `${user.phone}_deleted_${currentDate}`;
    }

    // Сохраняем обновленные значения в базе данных
    await user.save({ hooks: false }); // Отключаем хуки, чтобы избежать циклических вызовов
  }
}
