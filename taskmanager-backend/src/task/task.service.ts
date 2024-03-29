import {
  Logger,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { TaskPriority } from '../types/TaskPriority.enum';
import { Task } from './task.entity';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskListService } from 'src/task_list/task_list.service';

/* ====================================================================== */

@Injectable()
export class TasksService {
  private logger = new Logger(`TasksService`, { timestamp: true });

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @Inject(TaskListService)
    private taskListService: TaskListService,
  ) {}

  /* GET ALL / FILTERED TASKS */
  public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { task_priority, search, task_creation_time } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (task_priority) {
      query.andWhere(`task.task_priority = :task_priority`, {
        task_priority,
      });
    }

    if (search) {
      query.andWhere(
        `LOWER(task.task_name) LIKE LOWER(:search) OR LOWER(task.task_description) LIKE LOWER(:search)`,
        { search: `%${search}%` },
      );
    }

    if (task_creation_time) {
      query.andWhere(`DATE(task.task_creation_time) = :task_creation_time`, {
        task_creation_time,
      });
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to fetch tasks. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  /* GET A TASK BY ID */
  public async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        task_id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} -- WAS NOT FOUND!`);
    }

    return found;
  }

  /* DELETE A TASK */
  public async deleteTaskById(
    id: string,
  ): Promise<{ task_name: string; task_id: string }> {
    const found = await this.getTaskById(id);

    const { task_name, task_id } = found;
    const removed = await this.taskRepository.remove(found);

    if (!removed) {
      throw new NotFoundException(
        `Task card with ID: ${id} _apparently_ was found, since "getTaskById" provides the validation, BUT something went wrong.`,
      );
    }

    return { task_name, task_id };
  }

  /* CREATE A TASK */
  public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const {
      task_name,
      task_description,
      task_due_date,
      task_priority,
      task_list_id,
    } = createTaskDto;

    const taskList = await this.taskListService.getTaskListById(task_list_id);

    if (!taskList) {
      this.logger.error(`Task list with ID: ${task_list_id} -- WAS NOT FOUND!`);
      throw new NotFoundException(
        `Task list with ID: ${task_list_id} -- WAS NOT FOUND!`,
      );
    }

    const newTask = this.taskRepository.create({
      task_name,
      task_list_id,
      task_description,
      task_due_date,
      task_priority,
    });

    await this.taskRepository.save(newTask);

    return newTask;
  }

  /* UPDATE TASK PRIORITY */
  public async updateTaskPriority(
    id: string,
    newPriority: TaskPriority,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.task_priority = newPriority;
    await this.taskRepository.save(task);

    return task;
  }

  /* UPDATE TASK DESCRIPTION */
  public async updateTaskDescription(
    id: string,
    newDescription: string,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    task.task_description = newDescription;
    await this.taskRepository.save(task);

    return task;
  }

  /* UPDATE TASK NAME */
  public async updateTaskName(id: string, newName: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.task_name = newName;
    await this.taskRepository.save(task);

    return task;
  }

  /* UPDATE TASK LIST ID */
  public async updateTaskList(
    id: string,
    new_task_list_id: string,
  ): Promise<Task> {
    const taskList =
      await this.taskListService.getTaskListById(new_task_list_id);

    if (!taskList)
      throw new NotFoundException(
        `Task list with ID: ${new_task_list_id} -- WAS NOT FOUND!`,
      );

    const task = await this.getTaskById(id);

    task.task_list_id = new_task_list_id;
    await this.taskRepository.save(task);

    return task;
  }

  /* UPDATE TASK DUE DATE */
  public async updateTaskDueDate(id: string, newDate: string): Promise<Task> {
    const task = await this.getTaskById(id);
    task.task_due_date = newDate;
    await this.taskRepository.save(task);

    return task;
  }
}
