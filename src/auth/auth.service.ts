import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserRegisteredDto } from './dto/auth-user-registered.dto';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';
import { AuthEmailUserSignInDto } from './dto/auth-email-user-sign-in.dto';
import { UserRepository } from '../user/repository/user.repository';
import { User } from '../user/user.entity';
import { UserAdminRepository } from '../user/repository/user-admin.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private userAdminRepository: UserAdminRepository,
    private jwtService: JwtService,
  ) {}

  // TODO: Not sure that { user: User; access_token: string } is correct and should i create a dto for all return types?
  async signIn(userDto: AuthEmailUserSignInDto): Promise<{ user: User; access_token: string }> {
    const user = await this.userRepository.findOne(userDto.email);
    if (!user) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    const payload = {
      userId: user.id.toString(),
      username: user.username,
    };
    // TODO: Is this better method for remove a password field?
    const userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;
    return {
      user: userWithoutPassword,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: AuthUserRegisterDto): Promise<AuthUserRegisteredDto> {
    const existingUser = await this.userRepository.findOne(user.username);
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS_BASE, 10);
    user.password = await bcrypt.hash(user.password, saltRounds);
    const createdUser = await this.userRepository.create(user);
    // TODO: Is this a better method for remove a password field?
    const userWithoutPassword = createdUser.get({ plain: true });
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  // BELLOW A MOCK DATA FOR ADMIN EQUAL TO ABOVE
  // TODO: Not sure that { user: User; access_token: string } is correct and should i create a dto for all return types?
  async signInAdmin(userDto: AuthEmailUserSignInDto): Promise<{ user: User; access_token: string }> {
    const user = await this.userAdminRepository.findOne(userDto.email);
    if (!user) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is invalid');
    }
    const payload = {
      userId: user.id.toString(),
      username: user.username,
    };
    // TODO: Is this better method for remove a password field?
    const userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;
    return {
      user: userWithoutPassword,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUpAdmin(user: AuthUserRegisterDto): Promise<AuthUserRegisteredDto> {
    const existingUser = await this.userAdminRepository.findOne(user.username);
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }
    const saltRounds = parseInt(process.env.SALT_ROUNDS_BASE, 10);
    user.password = await bcrypt.hash(user.password, saltRounds);
    const createdUser = await this.userRepository.create(user);
    // TODO: Is this a better method for remove a password field?
    const userWithoutPassword = createdUser.get({ plain: true });
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }
}
