import { IsString } from 'class-validator';

export default class UpdateTaskNameDto {
  @IsString()
  task_name: string;
}
