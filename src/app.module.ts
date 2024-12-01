import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './common/exception/global-exception.exception';
import { LoggerRequestBodyMiddleware, LoggerRequestMethodMiddleware } from './common/middleware/middleware.middleware';
import { LoggerModule } from './logger/logger.module';
import { ExcludeNullInterceptor } from './common/iterceptor/null-iterceptor.interceptor';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ProductsModule, DatabaseModule, LoggerModule, AuthModule, ConfigModule.forRoot({ isGlobal: true })],
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
