import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS_BASE } from '../common/constant/constant';
import { AuthUserRegisteredDto } from './auth-user-registered.dto';
import { AuthUserRegisterDto } from './auth-user-register.dto';
import { AuthUserDto } from './auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneByUserName(username);
    if (!user) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    const payload = {
      userId: user._id.toString(),
      username: user.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: AuthUserRegisterDto): Promise<AuthUserRegisteredDto> {
    const existingUser = await this.findUser(user.username);
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    user.password = await bcrypt.hash(user.password, SALT_ROUNDS_BASE);
    return this.usersService.createUser(user);
  }

  async delete(user: AuthUserDto): Promise<AuthUserDto> {
    return this.usersService.deleteUser(user);
  }

  async getProfile(userId: string): Promise<AuthUserDto> {
    return await this.usersService.findOneById(userId);
  }

  async findUsersByName(name: string): Promise<AuthUserDto[]> {
    return await this.usersService.findUsersByName(name);
  }

  private async findUser(username: string): Promise<AuthUserDto> {
    return await this.usersService.findOneByUserName(username);
  }
}