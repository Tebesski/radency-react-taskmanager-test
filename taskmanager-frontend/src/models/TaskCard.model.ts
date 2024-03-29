interface ITaskCard {
   task_id?: string
   task_list_id: string
   task_name: string
   task_description: string
   task_due_date: string
   task_priority: string
   task_creation_date?: string
}

export default class TaskCardModel implements ITaskCard {
   task_id: string
   task_list_id: string
   task_name: string
   task_description: string
   task_due_date: string
   task_priority: string
   task_creation_date: string

   constructor(
      task_id: string,
      task_list_id: string,
      task_name: string,
      task_description: string,
      task_due_date: string,
      task_priority: string,
      task_creation_date: string
   ) {
      this.task_id = task_id
      this.task_list_id = task_list_id
      this.task_name = task_name
      this.task_description = task_description
      this.task_due_date = task_due_date
      this.task_priority = task_priority
      this.task_creation_date = task_creation_date
   }
}
