import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { User } from './user.entity';
import { UserRole } from './user-role.entity';

@Table({ tableName: 'roles', timestamps: true, paranoid: true })
export class Role extends Model<Role> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
