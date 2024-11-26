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
import { AllExceptionsFilter } from './app.exception';
import {
  LoggerRequestBodyMiddleware,
  LoggerRequestMethodMiddleware,
} from '../common/middleware/middleware.middleware';
import { AppLogger } from '../logger/logger.service';

@Module({
  imports: [ProductsModule, DatabaseModule],
  controllers: [AppController],
  exports: [AppLogger],
  providers: [
    AppService,
    AppLogger,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
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
