import { IsString } from 'class-validator';

export default class UpdateTaskDescriptionDto {
  @IsString()
  task_description: string;
}
