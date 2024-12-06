import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppLogger } from '../../logger/logger.service';

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
