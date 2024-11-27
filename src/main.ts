import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app/app.module';
import { AppLogger } from './logger/logger.service';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const config = new DocumentBuilder()
    .setTitle('NestJS project')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, documentFactory);

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
