import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from './logger.entity';
import * as path from 'path';
import * as fs from 'node:fs';

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

  async findAll(limit?: string): Promise<any[]> {
    try {
      // Проверяем, существует ли файл
      if (!fs.existsSync(this.logFilePath)) {
        return [];
      }

      // Читаем содержимое файла
      const fileContent = fs.readFileSync(this.logFilePath, 'utf8');

      // Разбиваем содержимое на строки и парсим каждый лог
      const logs = fileContent
        .trim()
        .split('\n')
        .map(line => JSON.parse(line));

      // Возвращаем ограниченное количество логов, если указано
      return limit ? logs.slice(0, Number(limit)) : logs;
    } catch (error) {
      console.error('Error reading logs:', error);
      throw new Error('Failed to read logs.');
    }
  }
}
