import { Module } from '@nestjs/common';
import { UserService } from './client_user/user.service';
import { UserRepository } from './client_user/user.repository';
import { UserController } from './client_user/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model/user.entity';
import { AdminUserService } from './admin_user/admin-user.service';
import { AdminUserRepository } from './admin_user/admin-user.repository';
import { AdminUserController } from './admin_user/admin-user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UserRepository, AdminUserService, AdminUserRepository],
  controllers: [UserController, AdminUserController],
  exports: [UserRepository, AdminUserRepository],
})
export class UserModule {}
