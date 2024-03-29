import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { faCircleQuestion, faTag } from "@fortawesome/free-solid-svg-icons"
import { Box } from "@mui/material"
import TaskModalInfoItem from "./TaskModalInfoItem"
import TaskModalStatusList from "./TaskModalStatusList"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../reducers/root-reducer"
import {
   setEditDueDateMode,
   setEditPriorityMode,
   setEditStatusMode,
} from "../../../../reducers/task-edit.reducer"
import TaskModalPriorityList from "./TaskModalPriorityList"

export default function TaskModalDetailsInfo() {
   const {
      editDueDateMode,
      editPriorityMode,
      editStatusMode,
      editingMode,
      cardPriority,
      newCardPriority,
      cardStatusName,
      newCardStatusName,
      cardDueDate,
      newCardDueDate,
   } = useSelector((state: RootState) => state.taskEdit)

   const dispatch = useDispatch()

   function handleEditStatus() {
      dispatch(setEditStatusMode(editStatusMode))
   }

   function handleEditPriority() {
      dispatch(setEditPriorityMode(editPriorityMode))
   }

   function handleEditDueDate() {
      dispatch(setEditDueDateMode(editDueDateMode))
   }

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            padding: 5.5,
            paddingTop: 0,
            gap: 1,
         }}
      >
         <TaskModalInfoItem
            icon={faCircleQuestion}
            infoType={"Status"}
            info={newCardStatusName || cardStatusName}
            editingMode={editingMode}
            handleEdit={handleEditStatus}
         />

         <TaskModalInfoItem
            icon={faCalendar}
            infoType={"Due date"}
            info={newCardDueDate || cardDueDate}
            editingMode={editingMode}
            handleEdit={handleEditDueDate}
            dueDate={true}
         />

         <TaskModalInfoItem
            icon={faTag}
            infoType={"Priority"}
            info={newCardPriority || cardPriority}
            editingMode={editingMode}
            handleEdit={handleEditPriority}
         />

         {editStatusMode && (
            <TaskModalStatusList
               setEditStatusMode={handleEditStatus}
               editStatusMode={editStatusMode}
            />
         )}

         {editPriorityMode && (
            <TaskModalPriorityList
               setEditPriorityMode={handleEditPriority}
               editPriorityMode={editPriorityMode}
            />
         )}

         {/* Look for DatePicker in EditButton.tsx */}
      </Box>
   )
}
