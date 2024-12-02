import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Gender } from '../common/constant/enums.enum';

@Table
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.ENUM, values: Object.values(Gender), allowNull: false })
  gender: Gender;
}
