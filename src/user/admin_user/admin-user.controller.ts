import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserFindByDto } from '../client_user/dto/user-find-by.dto';
import { UserUpdateDto } from '../client_user/dto/user-update.dto';
import { AdminUserService } from './admin-user.service';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesEnum } from '../model/roles.enum';

@Controller('admin/users')
@Roles(RolesEnum.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Get()
  findAll(@Query() findByDto: UserFindByDto) {
    return this.adminUserService.findAll(findByDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminUserService.findOne(id);
  }

  @Patch(':id')
  update(@Body() userUpdateDto: UserUpdateDto, @Param('id') id: number) {
    return this.adminUserService.update(id, userUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminUserService.remove(id);
  }
}
