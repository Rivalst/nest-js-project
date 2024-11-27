import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { ProductsModule } from '../products/products.module';
import { DatabaseModule } from '../database/database.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionsFilter } from './app.exception';
import {
  LoggerRequestBodyMiddleware,
  LoggerRequestMethodMiddleware,
} from '../common/middleware/middleware.middleware';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [ProductsModule, DatabaseModule, LoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
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
