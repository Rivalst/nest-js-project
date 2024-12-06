import { Controller, Get, Query, Render } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Controller('logviewer')
export class LoggerController {
  constructor(private loggerService: LoggerService) {}

  @Get()
  @Render('logviewer')
  async getLogs(@Query('limit') limit?: string) {
    const logs = await this.loggerService.findAll(limit);
    return { logs };
  }
}
