import { Controller, Get, Param } from '@nestjs/common';
import { LogService } from './log.service';
import Log from './log.entity';

@Controller('log')
export class LogController {
  constructor(private logService: LogService) {}

  @Get()
  public async getAllLogs(): Promise<Log[]> {
    return await this.logService.getAllLogs();
  }

  @Get('/:id')
  public async getLogsByCardId(@Param('id') id: string): Promise<Log[]> {
    return await this.logService.getLogsByCardId(id);
  }
}
