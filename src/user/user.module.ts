import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { usersProviders } from './user.providers';
import { UserRepository } from './user.repository';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, ...usersProviders, UserRepository],
  controllers: [UserController],
  exports: [UserRepository, ...usersProviders],
})
export class UserModule {}
