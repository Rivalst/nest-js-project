import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from './logger.entity';
import * as path from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  info(message: string) {
    // only for example
    this.log(message);
  }
}

export class LoggerService {
  private logFilePath: string;
  constructor(@InjectModel(Log) private readonly logModel: typeof Log) {
    this.logFilePath = path.resolve(__dirname, '../../logs/request.log');
  }

  async findAll(limit?: string): Promise<Log[]> {
    const logs = await this.logModel.findAll({
      limit: limit ? Number(limit) : undefined,
      order: [['createdAt', 'DESC']],
    });

    return logs;
  }
}
