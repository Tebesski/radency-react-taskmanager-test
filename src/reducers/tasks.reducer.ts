import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaskState } from "../types/TaskState"
import TaskCardModel from "../models/TaskCard.model"
import { UpdateTask } from "../types/UpdateTask"

const initialState: TaskState = {
   tasks: [],
   tasksLoading: true,
   addTaskLoading: false,
   deletingTaskLoading: false,
   movingTaskLoading: false,
   taskIsLoading: false,
   taskIsEditing: false,
}

const tasksSlice = createSlice({
   name: "tasksReducer",
   initialState,
   reducers: {
      setTasks(state, action: PayloadAction<TaskState>) {
         state.tasks = action.payload.tasks
         state.tasksLoading = action.payload.tasksLoading
      },

      setTasksLoading(state, action: PayloadAction<boolean>) {
         state.tasksLoading = action.payload
      },

      addTask(state, action: PayloadAction<TaskCardModel>) {
         state.tasks.push(action.payload)
      },

      addTaskLoading(state, action: PayloadAction<boolean>) {
         state.addTaskLoading = action.payload
      },

      deleteTask(state, action: PayloadAction<string>) {
         state.tasks = state.tasks.filter(
            (task) => task.task_id !== action.payload
         )
      },

      deleteTaskLoading(state, action: PayloadAction<boolean>) {
         state.addTaskLoading = action.payload
      },

      moveTask(
         state,
         action: PayloadAction<{ task_id: string; task_list_id: string }>
      ) {
         const task = state.tasks.find(
            (task) => task.task_id === action.payload.task_id
         )
         if (task) {
            task.task_list_id = action.payload.task_list_id
         }
      },

      movingTaskLoading(state, action: PayloadAction<boolean>) {
         state.addTaskLoading = action.payload
      },

      setTaskIsLoading(state, action: PayloadAction<boolean>) {
         state.tasksLoading = action.payload
      },

      setTaskIsEditing(state, action: PayloadAction<boolean>) {
         state.taskIsEditing = action.payload
      },

      updateTask(state, action: PayloadAction<UpdateTask>) {
         const task = state.tasks.find(
            (task) => task.task_id === action.payload.task_id
         )
         if (task) {
            if (action.payload.name !== undefined) {
               task.task_name = action.payload.name
            }
            if (action.payload.description !== undefined) {
               task.task_description = action.payload.description
            }
            if (action.payload.due_date !== undefined) {
               task.task_due_date = action.payload.due_date
            }
            if (action.payload.priority !== undefined) {
               task.task_priority = action.payload.priority
            }
            if (action.payload.task_list_id !== undefined) {
               task.task_list_id = action.payload.task_list_id
            }
         }
      },
   },
})

export const {
   setTasks,
   setTasksLoading,
   addTask,
   addTaskLoading,
   deleteTask,
   deleteTaskLoading,
   moveTask,
   movingTaskLoading,
   setTaskIsLoading,
   updateTask,
   setTaskIsEditing,
} = tasksSlice.actions

export default tasksSlice.reducer
