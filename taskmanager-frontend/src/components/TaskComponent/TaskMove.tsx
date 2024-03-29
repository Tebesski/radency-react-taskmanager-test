import {
   MenuItem,
   OutlinedInput,
   Select,
   SelectChangeEvent,
} from "@mui/material"
import { isValidElement, useState } from "react"
import { COLORS } from "../../constants/colors"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reducers/root-reducer"
import TaskListModel from "../../models/TaskList.model"
import { moveTask, movingTaskLoading } from "../../reducers/tasks.reducer"
import { moveTaskCard } from "../../api/api"

type TaskMoveProps = { taskListName: string; taskId: string }

export default function TaskMove({ taskListName, taskId }: TaskMoveProps) {
   const dispatch = useDispatch()
   const { taskList } = useSelector((state: RootState) => state.taskListSlice)

   const [newTaskList, setNewTaskList] = useState<string>("")

   async function handleChange(
      event: SelectChangeEvent<typeof newTaskList>,
      child: React.ReactNode
   ) {
      setNewTaskList(event.target.value)
      if (isValidElement(child)) {
         const newTaskListId = child.props["data-id"]

         dispatch(movingTaskLoading(true))
         await moveTaskCard(taskId, newTaskListId)
         dispatch(movingTaskLoading(false))
         dispatch(moveTask({ task_id: taskId, task_list_id: newTaskListId }))
      }
   }

   return (
      <Select
         sx={{
            height: 30,
            width: "100%",
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
               borderColor: COLORS.main,
            },
         }}
         displayEmpty
         id="move-to"
         onChange={handleChange}
         input={<OutlinedInput />}
         value={newTaskList}
         renderValue={(selected) => {
            if (selected.length === 0) {
               return <em>Move to:</em>
            }

            return selected
         }}
      >
         <MenuItem disabled value="default">
            <em>Move to:</em>
         </MenuItem>
         {taskList
            .filter(
               (task: TaskListModel) => task.task_list_name !== taskListName
            )
            .map((task: TaskListModel) => (
               <MenuItem
                  key={task.task_list_id}
                  data-id={task.task_list_id}
                  value={task.task_list_name}
               >
                  {task.task_list_name}
               </MenuItem>
            ))}
      </Select>
   )
}
