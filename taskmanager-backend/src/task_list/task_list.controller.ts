import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskListService } from './task_list.service';
import TaskList from './task_list.entity';
import CreateTaskListDto from './dto/create-task-list.dto';
import RenameTaskListDto from './dto/rename-task-list.dto';

@Controller('task-list')
export class TaskListController {
  constructor(private taskListService: TaskListService) {}

  @Get()
  public async getTaskList(): Promise<TaskList[]> {
    return await this.taskListService.getLists();
  }

  @Get('/:id')
  public async getTaskListById(@Param('id') id: string): Promise<TaskList> {
    return await this.taskListService.getTaskListById(id);
  }

  @Post()
  public async createTaskList(
    @Body() createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    return await this.taskListService.createList(createTaskListDto);
  }

  @Patch('/:id/task_list_name')
  public async renameList(
    @Body() renameTaskListDto: RenameTaskListDto,
    @Param('id') id: string,
  ): Promise<TaskList> {
    return await this.taskListService.renameList(renameTaskListDto, id);
  }

  @Delete('/:id')
  public async deleteTaskList(@Param('id') id: string): Promise<TaskList> {
    return await this.taskListService.deleteList(id);
  }
}
