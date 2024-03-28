import TaskCardModel from "../models/TaskCard.model"

export type TaskState = {
   tasks: TaskCardModel[]
   tasksLoading: boolean
   addTaskLoading?: boolean
   deletingTaskLoading?: boolean
   movingTaskLoading?: boolean
   taskIsLoading?: boolean
   taskIsEditing?: boolean
}
