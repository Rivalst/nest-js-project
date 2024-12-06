import { Global, Module } from '@nestjs/common';
import { AppLogger, LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from './logger.entity';

@Global()
@Module({
  imports: [SequelizeModule.forFeature([Log])],
  controllers: [LoggerController],
  providers: [AppLogger, LoggerService],
  exports: [AppLogger],
})
export class LoggerModule {}
