import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserAdminRepository } from './repository/user-admin.repository';

@Module({
  providers: [UserService, ...usersProviders, UserRepository, UserAdminRepository],
  controllers: [UserController],
  exports: [UserRepository, ...usersProviders, UserAdminRepository],
})
export class UserModule {}
