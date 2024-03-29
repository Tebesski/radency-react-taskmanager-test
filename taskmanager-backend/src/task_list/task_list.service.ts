import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateTaskListDto from './dto/create-task-list.dto';

import TaskList from './task_list.entity';
import RenameTaskListDto from './dto/rename-task-list.dto';

/* ====================================================================== */

@Injectable()
export class TaskListService {
  private logger = new Logger();

  constructor(
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
  ) {}

  /* GET ALL LISTS */
  public async getLists(): Promise<TaskList[]> {
    try {
      const lists = await this.taskListRepository.find({
        order: {
          num: 'ASC',
        },
      });
      return lists;
    } catch (error) {
      this.logger.error(`Failed to fetch all lists`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  /* GET TASK LIST BY ID */
  public async getTaskListById(id: string): Promise<TaskList> {
    try {
      const taskList = await this.taskListRepository.findOne({
        where: { task_list_id: id },
      });

      return taskList;
    } catch (error) {
      this.logger.error(
        `Failed to fetch task list with ID: ${id}`,
        error.stack,
      );
    }
  }

  /* CREATE A NEW TASK LIST */
  public async createList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const { task_list_name } = createTaskListDto;
    const newTaskList = this.taskListRepository.create({ task_list_name });

    await this.taskListRepository.save(newTaskList);

    return newTaskList;
  }

  /* RENAME A LIST */
  public async renameList(
    renameTaskListDto: RenameTaskListDto,
    id: string,
  ): Promise<TaskList> {
    const taskList = await this.taskListRepository.findOne({
      where: { task_list_id: id },
    });

    taskList.task_list_name = renameTaskListDto.task_list_name;
    await this.taskListRepository.save(taskList);

    return taskList;
  }

  /* DELETE A LIST */
  public async deleteList(id: string): Promise<TaskList> {
    const found = await this.taskListRepository.findOne({
      where: {
        task_list_id: id,
      },
    });

    if (!found) {
      throw new NotFoundException(`Task list with ID: ${id} -- WAS NOT FOUND!`);
    }

    await this.taskListRepository.remove(found);

    return found;
  }
}
