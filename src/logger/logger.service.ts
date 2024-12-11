import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LokiLogger } from 'nestjs-loki-logger';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  info(message: string) {
    // only for example
    this.log(message);
  }
}

export class LoggerService {
  constructor() {}

  private readonly lokiLogger = new LokiLogger('nestjs');

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
