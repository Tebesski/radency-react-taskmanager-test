import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import Log from './log.entity';
import { Task } from 'src/task/task.entity';
import { EntityType } from 'src/types/EntityType.enum';
import { Logger } from '@nestjs/common';
import { TaskLogActions } from 'src/types/TaskLogActions.enum';

@EventSubscriber()
export class LogTaskSubscriber implements EntitySubscriberInterface<Task> {
  private logger = new Logger();

  listenTo() {
    return Task;
  }

  /* ==================== AFTER INSERT ====================*/
  async afterInsert(event: InsertEvent<Task>) {
    await this.logAction(
      event,
      TaskLogActions.CREATE,
      null,
      null,
      null,
      event.entity.task_name,
    );
  }

  /* ==================== AFTER UPDATE ====================*/
  async afterUpdate(event: UpdateEvent<Task>) {
    const fieldActionMap = {
      task_name: TaskLogActions.RENAME,
      task_description: TaskLogActions.UPD_DESCRIPTION,
      task_priority: TaskLogActions.UPD_PRIORITY,
      task_due_date: TaskLogActions.UPD_DUE_DATE,
      task_list_id: TaskLogActions.MOVE,
    };

    for (const [field, action] of Object.entries(fieldActionMap)) {
      const oldValue = event.databaseEntity[field];
      const newValue = event.entity[field];

      if (
        oldValue instanceof Date &&
        newValue instanceof Date &&
        oldValue.getTime() === newValue.getTime()
      ) {
        continue;
      }

      if (oldValue !== newValue) {
        await this.logAction(
          event,
          action,
          event.databaseEntity,
          field as keyof Task,
          oldValue?.toString(),
          newValue?.toString(),
        );
      }
    }
  }

  /* ==================== AFTER REMOVE ====================*/
  async afterRemove(event: RemoveEvent<Task>) {
    await this.logAction(
      event,
      TaskLogActions.DELETE,
      event.databaseEntity,
      null,
      event.entity.task_name,
      null,
    );
  }

  /* ==================== LOG ACTION ====================*/
  private checkIfDate(value: string | null) {
    if (
      value &&
      isNaN(Number(value)) &&
      new Date(value).toString() !== 'Invalid Date'
    ) {
      return new Date(value).toISOString().slice(0, 10);
    }
    return value;
  }

  private async logAction(
    event: InsertEvent<Task> | UpdateEvent<Task> | RemoveEvent<Task>,
    action: TaskLogActions,
    dbEntity: Task | null,
    field: keyof Task | null,
    oldValue?: string,
    newValue?: string,
  ) {
    const log = new Log();
    log.entity_id = event.entity.task_id || dbEntity.task_id;
    log.entity_type = EntityType.Task;
    log.log_action = action;
    log.entity_field = field;
    log.old_value = oldValue === null ? null : this.checkIfDate(oldValue);
    log.new_value = newValue === null ? null : this.checkIfDate(newValue);

    const updateDetails =
      !!oldValue && !!newValue
        ? ` ${field || ''} (from ${log.old_value} to ${log.new_value})`
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
