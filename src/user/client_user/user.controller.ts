import { Body, Controller, Delete, Get, Patch, Query, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/user-update.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { UserFindByDto } from './dto/user-find-by.dto';
import { Public } from '../../common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @ApiBearerAuth()
  findOne(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @Public()
  @Get()
  findAll(@Query() dto: UserFindByDto) {
    return this.userService.findAll(dto);
  }

  @Patch()
  @ApiBearerAuth()
  update(@Request() req, @Body() dto: UserUpdateDto) {
    return this.userService.update(req.user.userId, dto);
  }

  @Delete()
  @ApiBearerAuth()
  remove(@Request() req) {
    return this.userService.remove(req.user.userId);
  }
}
