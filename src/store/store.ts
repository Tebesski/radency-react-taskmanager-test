import { configureStore } from "@reduxjs/toolkit"
import taskEditReducer from "../reducers/task-edit.reducer"
import taskSlice from "../reducers/tasks.reducer"
import taskListReducer from "../reducers/task-list.reducer"
import logReducer from "../reducers/log.reducer"

const store = configureStore({
   reducer: {
      taskEdit: taskEditReducer,
      taskSlice: taskSlice,
      taskListSlice: taskListReducer,
      logSlice: logReducer,
   },
})

export default store
