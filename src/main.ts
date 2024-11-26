import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AppLogger } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(new AppLogger());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // Need uncommented when using class-validatot @Transform
      // transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((error) => {
          const constraints = error.constraints;
          return Object.values(constraints)[0];
        });
        return new BadRequestException(errorMessages.join(', '));
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
