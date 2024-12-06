import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../../logger/logger.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from '../../logger/logger.entity';

@Injectable()
export class LoggerRequestMethodMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext('HttpRequestInfo');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Method: ${req.method}, for path: ${req.originalUrl}`);
    next();
  }
}

// do note used. There is only like example
// @Injectable()
// export class LoggerRequestUrlMiddleware implements NestMiddleware {
//   constructor(private readonly logger: AppLogger) {}
//
//   use(req: Request, res: Response, next: NextFunction) {
//     this.logger.info(`Request URL: ${req.originalUrl}`);
//     next();
//   }
// }

@Injectable()
export class LoggerRequestBodyMiddleware implements NestMiddleware {
  constructor(private readonly logger: AppLogger) {
    this.logger.setContext('HttpRequestBody');
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.info(`Body: ${JSON.stringify(req.body)}`);
    next();
  }
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@InjectModel(Log) private readonly logModel: typeof Log) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.originalUrl.startsWith('/api/logviewer')) {
      return next();
    }

    let requestBody: any = '';
    req.on('data', chunk => {
      requestBody += chunk;
    });

    req.on('end', () => {
      requestBody = requestBody ? JSON.parse(requestBody) : null;

      const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: requestBody,
      };

      const originalSend = res.send.bind(res);
      let responseBody: any;
      res.send = (chunk: any) => {
        try {
          responseBody = JSON.parse(chunk);
        } catch {
          responseBody = chunk;
        }

        const fullLogEntry = {
          ...logEntry,
          status: res.statusCode,
          response: responseBody,
        };

        // Сохраняем лог в базу данных
        this.logModel.create(fullLogEntry).catch(error => {
          console.error('Error saving log:', error);
        });

        return originalSend(chunk);
      };

      next();
    });
  }
}
