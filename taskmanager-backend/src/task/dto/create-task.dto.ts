import { IsNotEmpty } from 'class-validator';
import { TaskPriority } from '../../types/TaskPriority.enum';

export class CreateTaskDto {
  @IsNotEmpty()
  task_name: string;

  @IsNotEmpty()
  task_list_id: string;

  @IsNotEmpty()
  task_description: string;

  @IsNotEmpty()
  task_due_date: string;

  @IsNotEmpty()
  task_priority: TaskPriority;
}
