interface ITaskList {
   task_list_id: string
   task_list_name: string
}

export default class TaskListModel implements ITaskList {
   task_list_id: string
   task_list_name: string

   constructor(task_list_id: string, task_list_name: string) {
      this.task_list_id = task_list_id
      this.task_list_name = task_list_name
   }
}
