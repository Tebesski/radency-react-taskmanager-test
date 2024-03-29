import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskPriority } from '../../types/TaskPriority.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskPriority)
  task_priority?: TaskPriority;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsDateString()
  task_creation_time?: Date;
}
