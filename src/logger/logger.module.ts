import { Global, Module } from '@nestjs/common';
import { AppLogger, LoggerService } from './logger.service';
import { LokiLoggerModule } from 'nestjs-loki-logger';

@Global()
@Module({
  imports: [
    LokiLoggerModule.forRoot({
      lokiUrl: 'http://127.0.0.1:3131',
      labels: {
        app: 'nestjs',
      },
      logToConsole: false,
      onLokiError: e => console.error(e),
      gzip: false,
    }),
  ],
  providers: [AppLogger, LoggerService],
  exports: [AppLogger, LoggerService],
})
export class LoggerModule {}
