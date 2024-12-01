import { Controller, Delete, Get, Query, Request } from '@nestjs/common';
import { Public } from '../common/constant';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @Public()
  @Get('users')
  getAllUsers(@Query('name') name: string = '') {
    return this.userService.findUsersByName(name);
  }

  @Delete('delete')
  delete(@Request() req) {
    return this.userService.removeUser(req.user);
  }
}
