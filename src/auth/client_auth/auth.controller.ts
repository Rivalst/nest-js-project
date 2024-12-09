import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';
import { AuthEmailUserSignInDto } from './dto/auth-email-user-sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() dto: AuthEmailUserSignInDto) {
    return this.authService.signIn(dto);
  }

  @Post('sign-up')
  signUp(@Body() dto: AuthUserRegisterDto) {
    return this.authService.signUp(dto);
  }
}
