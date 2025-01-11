import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './common/exception/global-exception.exception';
import { LoggerRequestBodyMiddleware, LoggerRequestMethodMiddleware } from './common/middleware/middleware.middleware';
import { LoggerModule } from './logger/logger.module';
import { ExcludeNullInterceptor } from './common/iterceptor/null-iterceptor.interceptor';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { BlogModule } from './blog/blog.module';
import { CategoryModule } from './category/category.module';
import { DmsModule } from './dms/dms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LoggerModule,
    UserModule,
    AuthModule,
    CategoryModule,
    BlogModule,
    DmsModule,
  ],
  providers: [
    ExcludeNullInterceptor,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerRequestMethodMiddleware).forRoutes(':splat*');
    consumer.apply(LoggerMiddleware).forRoutes(':splat*');
    // only for example use a different settings forRoutes
    consumer.apply(LoggerRequestBodyMiddleware).forRoutes(
      {
        path: ':splat*',
        method: RequestMethod.POST,
      },
      {
        path: ':splat*',
        method: RequestMethod.PUT,
      },
    );
  }
}
