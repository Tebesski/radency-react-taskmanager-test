import { IsString } from 'class-validator';

export default class UpdateTaskListIdDto {
  @IsString()
  task_list_id: string;
}
