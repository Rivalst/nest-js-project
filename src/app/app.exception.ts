import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppLogger } from '../logger/logger.service';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext('GlobalExceptionsFilter');
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception);
    if (exception instanceof Error && exception.name === 'CastError') {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Object not found',
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    if (exception instanceof NotFoundException) {
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
      return;
    }

    const errorResponse = {
      statusCode: status,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
