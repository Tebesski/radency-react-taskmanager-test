import { IsNotEmpty } from 'class-validator';

export default class CreateTaskListDto {
  @IsNotEmpty()
  task_list_name: string;
}
