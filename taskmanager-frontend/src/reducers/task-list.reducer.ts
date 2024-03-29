import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import TaskList from "../types/TaskList"
import TaskListModel from "../models/TaskList.model"

const initialState: TaskList = {
   taskList: [],
   taskListLoading: true,
   taskListDeleting: false,
   taskListAdding: false,
}

const tasksListSlice = createSlice({
   name: "taskListReducer",
   initialState,
   reducers: {
      setTaskList(state, action: PayloadAction<TaskList>) {
         state.taskList = action.payload.taskList
         state.taskListLoading = action.payload.taskListLoading
      },
      addNewTask(state, action: PayloadAction<TaskListModel>) {
         state.taskList.push(action.payload)
      },
      deleteList(state, action: PayloadAction<string>) {
         state.taskList = state.taskList.filter(
            (task) => task.task_list_id !== action.payload
         )
      },
      renameTaskList(state, action: PayloadAction<TaskListModel>) {
         const index = state.taskList.findIndex(
            (task) => task.task_list_id === action.payload.task_list_id
         )
         if (index !== -1) {
            state.taskList.splice(index, 1, {
               ...state.taskList[index],
               task_list_name: action.payload.task_list_name,
            })
         }
      },
      setTaskListDeleting(state, action: PayloadAction<boolean>) {
         state.taskListDeleting = action.payload
      },
      setTaskListAdding(state, action: PayloadAction<boolean>) {
         state.taskListAdding = action.payload
      },
   },
})

export const {
   setTaskList,
   addNewTask,
   deleteList,
   setTaskListDeleting,
   setTaskListAdding,
   renameTaskList,
} = tasksListSlice.actions

export default tasksListSlice.reducer
