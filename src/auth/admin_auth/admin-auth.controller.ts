import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthEmailUserSignInDto } from '../client_auth/dto/auth-email-user-sign-in.dto';
import { AdminAuthService } from './admin-auth.service';

@Controller('admin/auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body() signInDto: AuthEmailUserSignInDto) {
    return this.adminAuthService.signIn(signInDto);
  }
}
