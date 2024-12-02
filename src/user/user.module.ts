import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserAdminRepository } from './user-admin.repository';

@Module({
  providers: [UserService, ...usersProviders, UserRepository],
  controllers: [UserController],
  exports: [UserRepository, ...usersProviders, UserAdminRepository],
})
export class UserModule {}
