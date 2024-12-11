import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { UserFindByDto } from '../client_user/dto/user-find-by.dto';
import { UserUpdateDto } from '../client_user/dto/user-update.dto';
import { AdminUserService } from './admin-user.service';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesEnum } from '../model/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('admin/users')
@ApiTags('Admin Users')
@ApiBearerAuth()
@Roles(RolesEnum.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Get()
  findAll(@Query() dto: UserFindByDto) {
    return this.adminUserService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminUserService.findOne(id);
  }

  @Patch(':id')
  update(@Body() dto: UserUpdateDto, @Param('id') id: number) {
    return this.adminUserService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminUserService.remove(id);
  }
}
