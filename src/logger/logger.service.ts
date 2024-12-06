import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { Log } from './logger.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  info(message: string) {
    // only for example
    this.log(message);
  }
}

export class LoggerService {
  constructor(@InjectModel(Log) private readonly logModel: typeof Log) {}

  async findAll(limit?: string): Promise<Log[]> {
    return this.logModel.findAll({
      limit: limit ? Number(limit) : undefined,
      order: [['createdAt', 'DESC']],
    });
  }
}
