import { Box } from "@mui/material"
import TaskListHeader from "./TaskListHeader"
import TaskListBody from "./css/TaskListBody"
import TaskCard from "../TaskComponent/TaskCard"
import { AddCardButton } from "../UI/AddCardButton"
import { useState } from "react"
import AddTaskModal from "../ModalComponent/AddTaskModal/AddTaskModal"
import TaskCardModel from "../../models/TaskCard.model"

type TaskListProps = {
   tasks: TaskCardModel[]
   task_list_name: string
   task_list_id: string
   searchQuery: string
}

export default function TaskList({
   tasks,
   task_list_name,
   task_list_id,
   searchQuery,
}: TaskListProps) {
   const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false)
   const taskListName = task_list_name

   const filteredTasks = tasks.filter(
      (task) =>
         task.task_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         task.task_description.toLowerCase().includes(searchQuery.toLowerCase())
   )

   function handleAddTaskModalOpen() {
      setAddTaskModalIsOpen(true)
   }

   function handleAddTaskModalClose() {
      setAddTaskModalIsOpen(false)
   }

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
         }}
      >
         <TaskListHeader
            onAddTask={handleAddTaskModalOpen}
            taskListName={taskListName}
            taskListCardsAmount={tasks.length}
            taskListId={task_list_id}
         />
         <AddCardButton onClick={handleAddTaskModalOpen} disableRipple>
            Add new card
         </AddCardButton>
         <TaskListBody>
            {filteredTasks.map((task) => {
               return (
                  <TaskCard
                     key={task.task_id}
                     taskName={task.task_name}
                     taskCreationTime={task.task_creation_date}
                     taskDescription={task.task_description}
                     taskDueDate={task.task_due_date}
                     taskPriority={task.task_priority}
                     taskListName={taskListName}
                     taskId={task.task_id}
                  />
               )
            })}
         </TaskListBody>
         <AddTaskModal
            isOpen={addTaskModalIsOpen}
            onClose={handleAddTaskModalClose}
            taskListId={task_list_id}
         />
      </Box>
   )
}
