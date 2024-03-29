import { combineReducers } from "@reduxjs/toolkit"
import taskEditReducer from "./task-edit.reducer"
import tasksReducer from "./tasks.reducer"
import taskListReducer from "./task-list.reducer"
import logReducer from "./log.reducer"

const rootReducer = combineReducers({
   taskEdit: taskEditReducer,
   taskSlice: tasksReducer,
   taskListSlice: taskListReducer,
   logSlice: logReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
