import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

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
      synchronize: true,
      autoLoadModels: true,
    }),
  ],
})
export class DatabaseModule {}
