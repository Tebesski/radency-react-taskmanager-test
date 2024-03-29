import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import Log from './log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityType } from 'src/types/EntityType.enum';

@Injectable()
export class LogService {
  private logger = new Logger();

  constructor(
    @InjectRepository(Log)
    private logRepositry: Repository<Log>,
  ) {}

  public async getAllLogs(): Promise<Log[]> {
    try {
      const logs = await this.logRepositry.find({
        order: { log_date: 'DESC' },
      });
      return logs;
    } catch (error) {
      this.logger.error(`Failed to fetch all logs`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  public async getLogsByCardId(id: string): Promise<Log[]> {
    try {
      const cardLogs = await this.logRepositry.find({
        where: { entity_type: EntityType.Task, entity_id: id },
        order: { log_date: 'DESC' },
      });

      return cardLogs;
    } catch (error) {
      this.logger.error(`Failed to fetch log with ID: ${id}`, error.stack);
      throw new InternalServerErrorException();
    }
  }
}
