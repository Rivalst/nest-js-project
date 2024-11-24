import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './feature/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // TODO: not sure for use this
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
