import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

export const globalPipe = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  // Need uncommented when using class-validatot @Transform
  // transform: true,
  exceptionFactory: (errors: ValidationError[]) => {
    const errorMessages = errors.map(error => {
      const constraints = error.constraints;
      return Object.values(constraints)[0];
    });
    return new BadRequestException(errorMessages.join(', '));
  },
});
