import { useDispatch, useSelector } from "react-redux"
import { Box, TextField, Typography } from "@mui/material"
import { faCheck, faFileEdit, faTimes } from "@fortawesome/free-solid-svg-icons"

import { COLORS } from "../../../../constants/colors"
import ModalButton from "../../../UI/ModalButton"

import { RootState } from "../../../../reducers/root-reducer"
import {
   setCardDetails,
   setEditingMode,
   setNewCardDescription,
   setNewCardDueDate,
   setNewCardName,
   setNewCardPriority,
   setNewCardStatusName,
   setNewCardStatusId,
} from "../../../../reducers/task-edit.reducer"
import TaskCardModel from "../../../../models/TaskCard.model"
import {
   setTaskIsEditing,
   updateTask,
} from "../../../../reducers/tasks.reducer"
import {
   fetchLogByTaskId,
   moveTaskCard,
   updateTaskCardDescription,
   updateTaskCardDueDate,
   updateTaskCardName,
   updateTaskCardPriority,
} from "../../../../api/api"
import dayjs from "dayjs"
import { addLog, setCardLogsLoading } from "../../../../reducers/log.reducer"

export default function TaskModalDetailsTitle({
   task,
}: {
   task: TaskCardModel
}) {
   const {
      editingMode,
      cardName,
      newCardName,
      cardDescription,
      newCardDescription,
      cardDueDate,
      newCardDueDate,
      cardStatusName,
      cardStatusId,
      newCardStatusId,
      cardPriority,
      newCardPriority,
   } = useSelector((state: RootState) => state.taskEdit)

   const { taskList } = useSelector((state: RootState) => state.taskListSlice)

   const dispatch = useDispatch()

   function handleCancelEdits() {
      dispatch(setEditingMode(false))
   }

   function handleEditCard() {
      dispatch(setNewCardName(cardName))
      dispatch(setNewCardDescription(cardDescription))
      dispatch(setNewCardDueDate(newCardDueDate || cardDueDate))
      dispatch(setNewCardStatusName(cardStatusName))
      dispatch(setNewCardStatusId(cardStatusId))
      dispatch(setNewCardPriority(cardPriority))
      dispatch(setEditingMode(true))
   }

   async function handleSubmitEdits() {
      const list = taskList.find(
         (list) => list.task_list_id === newCardStatusId || cardStatusId
      )
      if (!list) return

      dispatch(
         setCardDetails({
            task_name: newCardName,
            task_description: newCardDescription,
            task_due_date: newCardDueDate,
            task_list_name: list.task_list_name,
            task_priority: newCardPriority,
            task_list_id: newCardStatusId,
         })
      )

      dispatch(
         updateTask({
            task_id: task.task_id,
            name: newCardName,
            description: newCardDescription,
            due_date: newCardDueDate,
            priority: newCardPriority,
            task_list_id: newCardStatusId,
         })
      )

      async function postUpdates() {
         if (cardName !== newCardName) {
            await updateTaskCardName(task.task_id, newCardName)
         }
         if (cardDescription !== newCardDescription) {
            await updateTaskCardDescription(task.task_id, newCardDescription)
         }
         if (cardDueDate !== newCardDueDate) {
            let formattedDate = dayjs(newCardDueDate).format("YYYY-MM-DD")
            await updateTaskCardDueDate(task.task_id, formattedDate)
         }
         if (cardPriority !== newCardPriority) {
            await updateTaskCardPriority(
               task.task_id,
               newCardPriority.toUpperCase()
            )
         }
         if (cardStatusId !== newCardStatusId) {
            await moveTaskCard(task.task_id, newCardStatusId)
         }
      }

      async function getLatestLog() {
         const logs = await fetchLogByTaskId(task.task_id)
         if (!logs) return
         dispatch(addLog(logs[0]))
      }

      dispatch(setTaskIsEditing(true))
      dispatch(setCardLogsLoading(true))
      await postUpdates()
      await getLatestLog()
      dispatch(setTaskIsEditing(false))
      dispatch(setCardLogsLoading(false))

      dispatch(setEditingMode(false))
   }

   function handleSetNewCardName(event: React.ChangeEvent<HTMLInputElement>) {
      dispatch(setNewCardName(event.target.value))
   }

   const CardTitle = editingMode ? (
      <TextField
         key="editing"
         value={newCardName}
         onChange={handleSetNewCardName}
         variant="standard"
         sx={{
            input: {
               padding: 0,
            },
            width: "40%",
            "& .MuiInputBase-root": {
               fontSize: 34,
               fontWeight: 700,
               borderRadius: 0,
               padding: 0,
            },
            "& .MuiFilledInput-underline:before": {
               display: "none",
            },
            "& .MuiFilledInput-underline:after": {
               display: "none",
            },
         }}
      />
   ) : (
      <Typography variant="h4" sx={{ fontWeight: "bold", flex: 5 }}>
         {newCardName || cardName}
      </Typography>
   )

   const Button = editingMode ? (
      <Box sx={{ display: "flex", gap: 1 }}>
         <ModalButton
            onClick={handleSubmitEdits}
            color={COLORS.main}
            activeBgColor={COLORS.main_darker}
            activeBorderColor={COLORS.main}
            activeColor={COLORS.light}
            icon={faCheck}
            text={"Save"}
            width="100px"
         />
         <ModalButton
            onClick={handleCancelEdits}
            color={"red"}
            activeBgColor={"red"}
            activeBorderColor={"red"}
            activeColor={COLORS.light}
            icon={faTimes}
            text={"Cancel"}
            width="100px"
         />
      </Box>
   ) : (
      <ModalButton
         onClick={handleEditCard}
         color={COLORS.main}
         activeBgColor={COLORS.main_darker}
         activeBorderColor={COLORS.main}
         activeColor={COLORS.light}
         icon={faFileEdit}
         text={"Edit task"}
      />
   )

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            paddingBottom: 3,
         }}
      >
         {CardTitle}
         {Button}
      </Box>
   )
}
