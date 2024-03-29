import { IsNotEmpty } from 'class-validator';

export default class RenameTaskListDto {
  @IsNotEmpty()
  task_list_name: string;
}
