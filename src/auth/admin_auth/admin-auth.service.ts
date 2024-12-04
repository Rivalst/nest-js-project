import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEmailUserSignInDto } from '../client_auth/dto/auth-email-user-sign-in.dto';
import * as bcrypt from 'bcrypt';
import { AdminUserRepository } from '../../user/admin_user/admin-user.repository';

@Injectable()
export class AdminAuthService {
  constructor(
    private adminUserRepository: AdminUserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: AuthEmailUserSignInDto) {
    const user = await this.adminUserRepository.findOneByLogin(userDto.email);
    if (!user) {
      throw new BadRequestException('Username or password is invalid');
    }

    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const accessToken = await this.generateTokens(user, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_TIME);
    const refreshToken = await this.generateTokens(user, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_TIME);

    const transformUser = await this.adminUserRepository.findOne(user.id);

    return {
      user: transformUser,
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }

  private async generateTokens(user: { id: number; username: string }, secret: string, expiresIn: string) {
    const payload = { userId: user.id, username: user.username };

    return await this.jwtService.signAsync(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
