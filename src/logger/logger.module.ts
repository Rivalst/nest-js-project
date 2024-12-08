import { Global, Module } from '@nestjs/common';
import { AppLogger, LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from './logger.entity';
import { LokiLoggerModule } from 'nestjs-loki-logger';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([Log]),
    LokiLoggerModule.forRoot({
      lokiUrl: 'http://127.0.0.1:3100',
      labels: {
        app: 'nestjs',
      },
      logToConsole: false,
      onLokiError: e => console.error(e),
      gzip: false,
    }),
  ],
  controllers: [LoggerController],
  providers: [AppLogger, LoggerService],
  exports: [AppLogger, LoggerService],
})
export class LoggerModule {}
