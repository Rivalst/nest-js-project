import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/constant/constant';
import { AuthUserRegisteredDto } from './auth-user-registered.dto';
import { AuthUserRegisterDto } from './auth-user-register.dto';
import { AuthUserSignInDto } from './auth-user-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthUserSignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  @Public()
  @Get('users')
  getAllUsers(@Query('name') name: string = '') {
    return this.authService.findUsersByName(name);
  }

  @Public()
  @Post('register')
  register(
    @Body() authUserDto: AuthUserRegisterDto,
  ): Promise<AuthUserRegisteredDto> {
    return this.authService.signUp(authUserDto);
  }

  @Delete('delete')
  delete(@Request() req) {
    return this.authService.delete(req.user);
  }
}
