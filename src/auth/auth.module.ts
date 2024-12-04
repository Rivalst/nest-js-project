import { Module } from '@nestjs/common';
import { AuthController } from './client_auth/auth.controller';
import { AuthService } from './client_auth/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constant';
import { AdminAuthService } from './admin_auth/admin-auth.service';
import { AdminAuthController } from './admin_auth/admin-auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  providers: [AuthService, AdminAuthService],
  controllers: [AuthController, AdminAuthController],
})
export class AuthModule {}
