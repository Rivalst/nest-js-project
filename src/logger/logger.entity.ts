import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'logs' })
export class Log extends Model<Log> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  timestamp: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  method: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  url: string;

  @Column({
    type: DataType.JSONB,
    // allowNull: true,
  })
  headers: object;

  @Column({
    type: DataType.JSONB,
    // allowNull: true,
  })
  body: object;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  @Column({
    type: DataType.JSONB,
    // allowNull: true,
  })
  response: object;
}
