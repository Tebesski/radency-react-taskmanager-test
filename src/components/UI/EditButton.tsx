import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Button, IconButton, styled } from "@mui/material"
import { COLORS } from "../../constants/colors"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reducers/root-reducer"
import { DatePicker } from "@mui/x-date-pickers"
import { faClose } from "@fortawesome/free-solid-svg-icons"
import {
   setNewCardDueDate,
   setEditDueDateMode,
} from "../../reducers/task-edit.reducer"
import dayjs from "dayjs"

type ModalButtonProps = {
   text: string
   onClick: () => void
   color?: string
   activeBgColor?: string
   activeBorderColor?: string
   activeColor?: string
   dueDate?: boolean
   task_due_date?: string
}

export default function EditButton({
   text,
   color = COLORS.main,
   activeBgColor = COLORS.main_darker,
   activeBorderColor = COLORS.main,
   activeColor = COLORS.light,
   onClick,
   dueDate = false,
}: ModalButtonProps) {
   const { editDueDateMode, cardDueDate, newCardDueDate } = useSelector(
      (state: RootState) => state.taskEdit
   )
   const dispatch = useDispatch()

   function handleCloseEdit() {
      dispatch(setEditDueDateMode(editDueDateMode))
   }

   function handleSaveDueDate(value: string) {
      handleCloseEdit()
      dispatch(setNewCardDueDate(value))
   }

   const EditButtonStyled = styled(Button)({
      padding: "10px",
      flexDirection: "row",
      border: `1px dashed ${color}`,
      gap: 5,
      color,
      maxWidth: 180,
      height: 30,
      fontWeight: 600,
      justifyItems: "center",
      justifyContent: "center",
      "&:hover": {
         backgroundColor: "#e2e6e7",
         borderColor: "darkslategray",
      },
      "&:active": {
         backgroundColor: `${activeBgColor}`,
         borderColor: `${activeBorderColor}`,
         color: `${activeColor}`,
      },
   })

   return editDueDateMode && dueDate ? (
      <Box sx={{ display: "flex", alignItems: "center" }}>
         <DatePicker
            views={["month", "day"]}
            sx={{
               "& .MuiOutlinedInput-root": {
                  padding: 1,
                  height: 30,
                  width: 190,
               },
            }}
            onChange={(value) => {
               handleSaveDueDate(dayjs(value).format("ddd, D MMMM YYYY"))
            }}
            defaultValue={dayjs(newCardDueDate || cardDueDate)}
         />
         <IconButton sx={{ display: "inline" }} onClick={handleCloseEdit}>
            <FontAwesomeIcon icon={faClose} />
         </IconButton>
      </Box>
   ) : (
      <EditButtonStyled size="small" onClick={onClick} disableRipple>
         <FontAwesomeIcon size="xs" icon={faEdit} />
         {text}
      </EditButtonStyled>
   )
}
