import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from './logger.service';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: LoggerService,
    @InjectMetric('http_request_duration_seconds')
    private histogram: Histogram<string>,
  ) {}

  private logBasedOnStatus(status: number, message: string, data: Record<string, any>) {
    if (status >= 400) {
      this.logger.error(message, data);
    } else {
      this.logger.info(message, data);
    }
  }

  private sanitizeBody(body: any): any {
    if (body && typeof body === 'object') {
      if (body.password) {
        body.password = '***';
      }

      Object.keys(body).forEach(key => {
        if (typeof body[key] === 'object') {
          body[key] = this.sanitizeBody(body[key]);
        }
      });
    }

    return body;
  }

  use(req: Request, res: Response, next: NextFunction) {
    const end = this.histogram.startTimer();
    if (req.originalUrl.startsWith('/api/logviewer')) {
      return next();
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body || null,
    };

    const originalSend = res.send.bind(res);
    let responseBody: any;
    res.send = (chunk: any) => {
      try {
        responseBody = JSON.parse(chunk);
      } catch {
        responseBody = chunk;
      }

      const sanitizedBody = this.sanitizeBody(logEntry.body);
      const logEntryWithBody = { ...logEntry, body: sanitizedBody };

      const fullLogEntry = {
        ...logEntryWithBody,
        status: res.statusCode,
        response: responseBody,
      };

      this.logBasedOnStatus(res.statusCode, 'http request', fullLogEntry);
      end({ method: req.method, path: req.path, status: res.statusCode });
      return originalSend(chunk);
    };

    next();
  }
}
