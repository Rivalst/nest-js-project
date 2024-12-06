import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from './logger.entity';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@InjectModel(Log) private readonly logModel: typeof Log) {}

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

      this.logModel.create(fullLogEntry).catch(error => {
        console.error('Error saving log:', error);
      });

      return originalSend(chunk);
    };

    next();
  }
}
