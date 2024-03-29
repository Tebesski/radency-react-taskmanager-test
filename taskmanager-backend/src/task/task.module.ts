import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './task.controller';
import { TasksService } from './task.service';
import { Task } from './task.entity';
import { TaskListModule } from 'src/task_list/task_list.module';

@Module({
  imports: [TaskListModule, TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
