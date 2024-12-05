import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Gender } from './gender.enum';

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
}
