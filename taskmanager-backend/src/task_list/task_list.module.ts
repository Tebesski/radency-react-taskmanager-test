import { Module } from '@nestjs/common';
import { TaskListService } from './task_list.service';
import { TaskListController } from './task_list.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import TaskList from './task_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList])],
  exports: [TaskListService],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
