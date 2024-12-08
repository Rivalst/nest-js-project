import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Log } from './logger.entity';
import { InjectModel } from '@nestjs/sequelize';
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  info(message: string) {
    // only for example
    this.log(message);
  }
}

export class LoggerService {
  constructor(@InjectModel(Log) private readonly logModel: typeof Log) {}

  private readonly lokiLogger = new LokiLogger('nestjs');

  async findAll(limit?: string): Promise<Log[]> {
    return this.logModel.findAll({
      limit: limit ? Number(limit) : undefined,
      order: [['createdAt', 'DESC']],
    });
  }

  info(message: string, data?: Record<string, any>) {
    const logEntryString = JSON.stringify(data);
    return this.lokiLogger.log(logEntryString, 'nestjs');
  }

  warn(message: string, data?: Record<string, any>) {
    const logEntryString = JSON.stringify(data);
    return this.lokiLogger.warn(logEntryString, 'nestjs');
  }

  error(message: string, data?: Record<string, any>) {
    const logEntryString = JSON.stringify(data);
    return this.lokiLogger.error(logEntryString, 'nestjs');
  }
}
