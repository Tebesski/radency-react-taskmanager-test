export type UpdateTask = {
   task_id: string
   name: string
   description: string
   due_date: string
   priority: TaskPriorityEnum
   task_list_id: string
}
