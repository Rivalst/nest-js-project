import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/model/user.entity';
import { UserRole } from '../user/model/user-role.entity';
import { Role } from '../user/model/role.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      dialect: 'postgres',
      define: {
        underscored: true,
      },
      models: [User, UserRole, Role],
      synchronize: true,
      autoLoadModels: true,
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
