import { IsEnum } from 'class-validator';
import { TaskPriority } from '../../types/TaskPriority.enum';

export class UpdateTaskPriorityDto {
  @IsEnum(TaskPriority)
  task_priority: TaskPriority;
}
