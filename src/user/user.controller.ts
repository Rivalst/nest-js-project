import { Body, Controller, Delete, Get, Post, Query, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { Public } from '../common/constant';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @Public()
  @Get('users')
  getUsers(@Query('find-by') value: string, @Query('sort') sort: 'old' | 'new' = 'new') {
    return this.userService.findAll(value, sort);
  }

  @Post('update')
  update(@Request() req, @Body() body: UserUpdateDto) {
    return this.userService.update(req.user.userId, body);
  }

  @Delete('delete')
  remove(@Request() req) {
    return this.userService.remove(req.user.userId);
  }
}
