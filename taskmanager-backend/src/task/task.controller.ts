import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Logger,
} from '@nestjs/common';
import { TasksService } from './task.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskPriorityDto } from './dto/update-task-priority.dto';
import { Task } from './task.entity';
import UpdateTaskNameDto from './dto/update-task-name.dto';
import UpdateTaskDescriptionDto from './dto/update-task-description.dto';
import UpdateTaskDueDateDto from './dto/update-task-due-date.dto';
import UpdateTaskListIdDto from './dto/update-task-list-id.dto';

@Controller('tasks')
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @Get()
  public async getTasks(
    @Query() filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    this.logger.verbose(
      `Retrieving tasks. Filters: ${JSON.stringify(filterDto)}`,
    );
    return await this.tasksService.getTasks(filterDto);
  }

  /* GET TASK BY ID */
  @Get('/:id')
  public async getTaskById(@Param('id') id: string): Promise<Task> {
    this.logger.verbose(`Retrieving task with ID: ${id}`);
    return await this.tasksService.getTaskById(id);
  }

  /* DELETE A TASK */
  @Delete('/:id')
  public async deleteTaskById(
    @Param('id') id: string,
  ): Promise<{ task_name: string; task_id: string }> {
    this.logger.verbose(`Deleting task with ID: ${id}`);
    return await this.tasksService.deleteTaskById(id);
  }

  /* CREATE TASK */
  @Post()
  public async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    this.logger.verbose(
      `Creating task with the following parameters: ${JSON.stringify(createTaskDto)}`,
    );
    return await this.tasksService.createTask(createTaskDto);
  }

  /* UPDATE TASK PRIORITY */
  @Patch('/:id/task_priority')
  public async updateTaskPriority(
    @Param('id') id: string,
    @Body() updateTaskPriorityDto: UpdateTaskPriorityDto,
  ): Promise<Task> {
    return await this.tasksService.updateTaskPriority(
      id,
      updateTaskPriorityDto.task_priority,
    );
  }

  /* UPDATE TASK NAME */
  @Patch('/:id/task_name')
  public async updateTaskName(
    @Param('id') id: string,
    @Body() updateTaskNameDto: UpdateTaskNameDto,
  ): Promise<Task> {
    return await this.tasksService.updateTaskName(
      id,
      updateTaskNameDto.task_name,
    );
  }

  /* UPDATE TASK DESCRIPTION */
  @Patch('/:id/task_description')
  public async updateTaskDescription(
    @Param('id') id: string,
    @Body() updateTaskDescriptionDto: UpdateTaskDescriptionDto,
  ): Promise<Task> {
    return await this.tasksService.updateTaskDescription(
      id,
      updateTaskDescriptionDto.task_description,
    );
  }

  /* UPDATE TASK DUE DATE */
  @Patch('/:id/task_due_date')
  public async updateTaskDueDate(
    @Param('id') id: string,
    @Body() updateTaskDueDateDto: UpdateTaskDueDateDto,
  ): Promise<Task> {
    return await this.tasksService.updateTaskDueDate(
      id,
      updateTaskDueDateDto.task_due_date,
    );
  }

  /* UPDATE TASK LIST ID */
  @Patch('/:id/task_list_id')
  public async updateTaskListId(
    @Param('id') id: string,
    @Body() updateTaskListIdDto: UpdateTaskListIdDto,
  ): Promise<Task> {
    try {
      return this.tasksService.updateTaskList(
        id,
        updateTaskListIdDto.task_list_id,
      );
    } catch (error) {
      this.logger.error(
        `Failed to change task's list current ID to new ID: ${updateTaskListIdDto.task_list_id}`,
        error.stack,
      );
    }
  }
}
