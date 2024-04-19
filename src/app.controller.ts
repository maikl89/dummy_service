import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('url') url: string): string {
    Logger.log(`ok path=${url}`);
    return this.appService.getHello();
  }
}
