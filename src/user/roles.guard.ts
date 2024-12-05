import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.entity';
import { Role } from './model/role.entity';
import { ROLES_KEY } from '../common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectModel(User) private userModel: typeof User,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userPayload = request.user;

    if (!userPayload) {
      throw new ForbiddenException('User not authenticated');
    }

    const user = await this.userModel.findByPk(userPayload.userId, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      throw new ForbiddenException();
    }

    const hasRole = user.roles.some(role => requiredRoles.includes(role.name));
    if (!hasRole) {
      throw new ForbiddenException();
    }

    return true;
  }
}
