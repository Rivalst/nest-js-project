import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';
import { AuthEmailUserSignInDto } from './dto/auth-email-user-sign-in.dto';
import { UserRepository } from '../../user/client_user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(userDto: AuthEmailUserSignInDto) {
    const user = await this.userRepository.findOneByLogin(userDto.email);
    if (!user) {
      throw new BadRequestException('Username or password is invalid');
    }

    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Username or password is invalid');
    }

    const accessToken = await this.generateTokens(user, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_TIME);
    const refreshToken = await this.generateTokens(user, process.env.JWT_REFRESH_SECRET, process.env.JWT_REFRESH_TIME);

    const transformUser = await this.userRepository.findOne(user.id);

    return {
      user: transformUser,
      access_token: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(userRegisterDto: AuthUserRegisterDto) {
    const existingUser = await this.userRepository.findOneByLogin(userRegisterDto.email);
    if (existingUser) {
      throw new ConflictException('User with this username already exists');
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS_BASE, 10);
    userRegisterDto.password = await bcrypt.hash(userRegisterDto.password, saltRounds);

    const createdUser = await this.userRepository.create(userRegisterDto);

    const accessToken = await this.generateTokens(
      createdUser,
      process.env.JWT_ACCESS_SECRET,
      process.env.JWT_ACCESS_TIME,
    );
    const refreshToken = await this.generateTokens(
      createdUser,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_TIME,
    );

    const user = await this.userRepository.findOne(createdUser.id);

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
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
