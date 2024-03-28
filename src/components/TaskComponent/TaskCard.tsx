import { Card, CardContent } from "@mui/material"
import TaskDescription from "./TaskDescription"
import TaskDueDate from "./TaskDueDate"
import TaskPriority from "./TaskPriority"
import TaskMove from "./TaskMove"
import TaskHeader from "./TaskHeader"
import TaskModal from "../ModalComponent/TaskModal/TaskModal"
import { useState } from "react"
import { setEditingMode } from "../../reducers/task-edit.reducer"
import { useDispatch } from "react-redux"

type TaskCardProps = {
   taskName: string
   taskCreationTime: string
   taskDueDate: string
   taskPriority: string
   taskDescription: string
   taskListName: string
   taskId: string
}

export default function TaskCard({
   taskName,
   taskCreationTime,
   taskDescription,
   taskDueDate,
   taskListName,
   taskPriority,
   taskId,
}: TaskCardProps) {
   const dispatch = useDispatch()
   const [taskModalOpen, setTaskModalOpen] = useState(false)

   function handleOpenTaskModal() {
      setTaskModalOpen(true)
   }

   function handleCloseTaskModal() {
      setTaskModalOpen(false)
      dispatch(setEditingMode(false))
   }

   return (
      <>
         <Card
            sx={{
               width: "100%",
               border: "2px solid rgba(34, 34, 32, 0.2)",
               boxSizing: "border-box",
            }}
            elevation={0}
         >
            {/* ========= CARD HEADER ========= */}
            <TaskHeader
               taskName={taskName}
               taskId={taskId}
               taskCreationTime={taskCreationTime}
               onOpenTaskModal={handleOpenTaskModal}
            />

            {/* ========= CARD CONTENT ========= */}
            <CardContent
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "flex-start",
               }}
            >
               <TaskDescription taskDescription={taskDescription} />
               <TaskDueDate taskDueDate={taskDueDate} />
               <TaskPriority taskPriority={taskPriority} />
               <TaskMove taskListName={taskListName} taskId={taskId} />
            </CardContent>
         </Card>

         {/* ========= CARD MODAL ========= */}
         <TaskModal
            isOpen={taskModalOpen}
            onCloseTaskModal={handleCloseTaskModal}
            taskId={taskId}
            taskListName={taskListName}
         />
      </>
   )
}
