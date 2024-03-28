import TaskListModel from "../models/TaskList.model"

type TaskList = {
   taskList: TaskListModel[]
   taskListLoading: boolean
   taskListDeleting?: boolean
   taskListAdding?: boolean
}

export default TaskList
