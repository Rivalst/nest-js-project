import { Table, Column, Model, DataType, BelongsToMany, AfterCreate } from 'sequelize-typescript';
import { Gender } from './gender.enum';
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
}
