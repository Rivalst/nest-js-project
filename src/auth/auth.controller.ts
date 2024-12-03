import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/constant';
import { AuthUserRegisteredDto } from './dto/auth-user-registered.dto';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';
import { AuthEmailUserSignInDto } from './dto/auth-email-user-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login-email')
  signIn(@Body() signInDto: AuthEmailUserSignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('register')
  signUp(@Body() authUserDto: AuthUserRegisterDto): Promise<AuthUserRegisteredDto> {
    return this.authService.signUp(authUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('admin-login')
  signInAdmin(@Body() signInDto: AuthEmailUserSignInDto) {
    return this.authService.signInAdmin(signInDto);
  }

  @Public()
  @Post('admin-register')
  signUpAdmin(@Body() authUserDto: AuthUserRegisterDto): Promise<AuthUserRegisteredDto> {
    return this.authService.signUpAdmin(authUserDto);
  }
}
