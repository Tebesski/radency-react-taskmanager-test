import { IsString } from 'class-validator';

export default class UpdateTaskDueDateDto {
  @IsString()
  task_due_date: string;
}
