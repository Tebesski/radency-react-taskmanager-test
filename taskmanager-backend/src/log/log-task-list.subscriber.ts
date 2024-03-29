import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import Log from './log.entity';
import TaskList from 'src/task_list/task_list.entity';
import { EntityType } from 'src/types/EntityType.enum';
import { Logger } from '@nestjs/common';
import { TaskListLogActions } from 'src/types/TaskListLogActions.enum';

@EventSubscriber()
export default class LogTaskListSubscriber
  implements EntitySubscriberInterface<TaskList>
{
  private logger = new Logger();

  listenTo() {
    return TaskList;
  }

  async afterInsert(event: InsertEvent<TaskList>) {
    await this.logAction(
      event,
      null,
      TaskListLogActions.CREATE,
      null,
      event.entity.task_list_name,
    );
  }

  async afterUpdate(event: UpdateEvent<TaskList>) {
    await this.logAction(
      event,
      event.databaseEntity,
      TaskListLogActions.UPDATE,
      event.databaseEntity.task_list_name,
      event.entity.task_list_name,
    );
  }

  async afterRemove(event: RemoveEvent<TaskList>) {
    await this.logAction(
      event,
      event.databaseEntity,
      TaskListLogActions.DELETE,
      event.entity.task_list_name,
      null,
    );
  }

  private async logAction(
    event:
      | InsertEvent<TaskList>
      | UpdateEvent<TaskList>
      | RemoveEvent<TaskList>,
    dbEntity: TaskList | null,
    action: TaskListLogActions,
    oldValue?: string,
    newValue?: string,
  ) {
    const log = new Log();
    log.entity_id = event.entity.task_list_id || dbEntity.task_list_id;
    log.entity_type = EntityType.TaskList;
    log.log_action = action;
    log.old_value = oldValue;
    log.new_value = newValue;
    log.entity_field = 'task_list_name';

    const updateDetails =
      !!oldValue && !!newValue
        ? ` (task_list_name from ${oldValue} to ${newValue})`
        : '';

    try {
      await event.manager.save(log);
      this.logger.log(
        `Succesfully created a log for ${log.log_action}${updateDetails} action upon ${log.entity_type} with ID: ${log.entity_id}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to create a log for ${log.log_action} action upon ${log.entity_type} with ID: ${log.entity_id}`,
        error.stack,
      );
    }
  }
}
