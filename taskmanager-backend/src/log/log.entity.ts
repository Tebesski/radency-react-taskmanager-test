import { IsUUID } from 'class-validator';
import { EntityType } from 'src/types/EntityType.enum';
import { TaskListLogActions } from 'src/types/TaskListLogActions.enum';
import { TaskLogActions } from 'src/types/TaskLogActions.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Log {
  @PrimaryGeneratedColumn('uuid')
  log_id: string;

  @Column()
  @IsUUID()
  entity_id: string;

  @Column()
  entity_type: EntityType;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP::timestamp(0)',
  })
  log_date: string;

  @Column()
  log_action: TaskListLogActions | TaskLogActions;

  @Column({ nullable: true })
  old_value: string;

  @Column({ nullable: true })
  new_value: string;

  @Column({ nullable: true })
  entity_field: string;
}
