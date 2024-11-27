import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext('GlobalExceptionsFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const error =
      exception instanceof HttpException
        ? exception.getResponse()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception);
    if (exception instanceof Error && exception.name === 'CastError') {
      response.status(HttpStatus.NOT_FOUND).json({
        message: 'Object not found',
        error: {
          message: exception.message,
          error: 'Not Found',
          statusCode: 404,
        },
      });
      return;
    }

    if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        message: 'Object not found',
        error: exception.getResponse(),
      });
      return;
    }

    const errorResponse = {
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
      error: error,
    };

    response.status(status).json(errorResponse);
  }
}
