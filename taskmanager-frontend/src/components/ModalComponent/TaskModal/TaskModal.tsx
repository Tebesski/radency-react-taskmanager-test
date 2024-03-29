import { CircularProgress, Dialog, DialogContent } from "@mui/material"
import TaskModalTitle from "./TaskModalTitle"
import TaskModalActivity from "./TaskModalActivity/TaskModalActivity"
import TaskModalDetails from "./TaskModalDetails/TaskModalDetails"
import TaskModalLog from "./TaskModalActivity/TaskModalLog"
import { useEffect, useState } from "react"
import { fetchLogByTaskId, fetchTaskByTaskId } from "../../../api/api"
import { useDispatch, useSelector } from "react-redux"
import { setTaskIsLoading } from "../../../reducers/tasks.reducer"
import { RootState } from "../../../reducers/root-reducer"
import TaskCardModel from "../../../models/TaskCard.model"
import { setCardDetails } from "../../../reducers/task-edit.reducer"
import dayjs from "dayjs"
import LogModel from "../../../models/Log.model"
import { setCardLogsLoading } from "../../../reducers/log.reducer"

type TaskModalProps = {
   isOpen: boolean
   onCloseTaskModal: () => void
   taskId: string
   taskListName: string
}

export default function TaskModal({
   isOpen,
   onCloseTaskModal,
   taskId,
   taskListName,
}: TaskModalProps) {
   const dispatch = useDispatch()

   const {
      newCardName,
      newCardDescription,
      newCardDueDate,
      newCardPriority,
      newCardStatusName,
      newCardStatusId,
   } = useSelector((state: RootState) => state.taskEdit)

   const { log } = useSelector((state: RootState) => state.logSlice)

   const [task, setTask] = useState<TaskCardModel | undefined>(undefined)
   const [logs, setLogs] = useState<LogModel[] | undefined>(undefined)

   useEffect(() => {
      if (!logs) return

      const taskLogs = log.filter((l) => l.entity_id === taskId)
      if (log.length > logs.length) {
         setLogs(taskLogs)
      }
   }, [log])

   useEffect(() => {
      if (isOpen) {
         async function fetchTask() {
            dispatch(setTaskIsLoading(true))
            const task = await fetchTaskByTaskId(taskId)
            dispatch(setTaskIsLoading(false))
            setTask(task)
         }
         fetchTask()
      }
   }, [isOpen, setTask])

   useEffect(() => {
      if (isOpen) {
         async function fetchLog() {
            dispatch(setCardLogsLoading(true))
            const log = await fetchLogByTaskId(taskId)
            dispatch(setCardLogsLoading(false))
            setLogs(log)
         }
         fetchLog()
      }
   }, [isOpen, setLogs])

   useEffect(() => {
      if (task) {
         dispatch(
            setCardDetails({
               task_name: newCardName || task.task_name,
               task_description: newCardDescription || task.task_description,
               task_due_date:
                  newCardDueDate ||
                  dayjs(task.task_due_date).format("ddd, D MMMM YYYY"),
               task_list_name: newCardStatusName || taskListName,
               task_priority: newCardPriority || task.task_priority,
               task_creation_date: task.task_creation_date,
               task_list_id: newCardStatusId || task.task_list_id,
            })
         )
      }
   }, [task])

   return (
      <Dialog
         onClose={onCloseTaskModal}
         open={isOpen}
         fullWidth
         maxWidth="lg"
         PaperProps={{ style: { borderRadius: 18 } }}
      >
         {/* --------------------------- TASK MODAL TITLE --------------------------- */}
         <TaskModalTitle onCloseTaskModal={onCloseTaskModal} />

         {/* --------------------------- TASK MODAL CONTENT --------------------------- */}
         <DialogContent
            dividers
            sx={{ height: "74vh", display: "flex", padding: 0, border: 0 }}
         >
            {/* DETAILS */}
            <TaskModalDetails task={task!} />

            {/* ACTIVITY LOG */}
            <TaskModalActivity isOpen={isOpen}>
               {logs ? (
                  logs.map((log) => {
                     return <TaskModalLog key={log.log_id} logItem={log} />
                  })
               ) : (
                  <CircularProgress />
               )}
            </TaskModalActivity>
         </DialogContent>
      </Dialog>
   )
}
