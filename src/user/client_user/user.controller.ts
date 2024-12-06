import { Body, Controller, Delete, Get, Patch, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { UserFindByDto } from './dto/user-find-by.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  findOne(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @Public()
  @Get()
  findAll(@Query() findByDto: UserFindByDto) {
    return this.userService.findAll(findByDto);
  }

  @Patch()
  update(@Request() req, @Body() body: UserUpdateDto) {
    return this.userService.update(req.user.userId, body);
  }

  @Delete()
  remove(@Request() req) {
    return this.userService.remove(req.user.userId);
  }
}