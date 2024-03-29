import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriority } from '../types/TaskPriority.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  task_id: string;

  @Column()
  task_list_id: string;

  @Column()
  task_name: string;

  @Column()
  task_description: string;

  @Column({ type: 'timestamp' })
  task_due_date: string;

  @Column()
  task_priority: TaskPriority;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP::timestamp(0)',
  })
  task_creation_time: string;
}
