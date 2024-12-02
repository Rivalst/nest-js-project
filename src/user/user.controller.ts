import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
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
