import {
   Box,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
} from "@mui/material"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

import FormInput from "../../UI/FormInput"
import dayjs, { Dayjs } from "dayjs"
import { COLORS } from "../../../constants/colors"
import SubmitButton from "../../UI/SubmitButton"
import { TaskPriorityEnum } from "../../../types/TaskPriorityEnum"
import { useDispatch } from "react-redux"
import { addTask, addTaskLoading } from "../../../reducers/tasks.reducer"
import TaskCardModel from "../../../models/TaskCard.model"
import { createTaskCard } from "../../../api/api"

type AddTaskModalFormProps = { taskListId: string; onClose: () => void }

export default function AddTaskModalForm({
   taskListId,
   onClose,
}: AddTaskModalFormProps) {
   const dispatch = useDispatch()

   const [cardName, setCardName] = useState<string>("")
   const [cardDescription, setCardDescription] = useState<string>("")
   const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs(new Date()))
   const [priority, setPriority] = useState<TaskPriorityEnum | "">("")

   const priorities = ["Low", "Medium", "High"]

   function handleDateChange(date: Dayjs | null) {
      setDueDate(date)
   }

   function handleSetPriority(e: SelectChangeEvent<TaskPriorityEnum>) {
      setPriority(e.target.value as TaskPriorityEnum)
   }

   async function handleCardSubmit() {
      if (!cardName.trim() || !priority || !dueDate || !cardDescription.trim())
         return

      const newTask = new TaskCardModel(
         cardName,
         taskListId,
         cardName,
         cardDescription,
         dueDate.format("YYYY-MM-DD"),
         priority as string,
         new Date().toISOString()
      )

      dispatch(addTaskLoading(true))
      const newTaskCard = await createTaskCard(newTask)
      dispatch(addTaskLoading(false))

      if (!newTaskCard) return

      const fetchedNewTask = {
         task_id: newTaskCard.task_id,
         task_list_id: newTaskCard.task_list_id,
         task_name: newTaskCard.task_name,
         task_description: newTaskCard.task_description,
         task_due_date: newTaskCard.task_due_date,
         task_priority: newTaskCard.task_priority,
         task_creation_date: newTaskCard.task_creation_date,
      }

      dispatch(addTask(fetchedNewTask))
      onClose()
   }

   return (
      <Box>
         <FormControl sx={{ padding: 3, paddingTop: 2, gap: 4 }} required>
            <FormInput
               required
               placeholder={"Enter card name... *"}
               value={cardName}
               changeHandler={setCardName}
            />

            <FormInput
               required
               textfield
               multiline
               placeholder={"Enter card description... *"}
               value={cardDescription}
               changeHandler={setCardDescription}
            />

            <FormControl>
               <InputLabel
                  sx={{
                     color: COLORS.dark,
                     "&.Mui-focused": {
                        color: COLORS.main,
                     },
                  }}
                  id="add-task-modal-priority"
               >
                  Priority *
               </InputLabel>

               <Select
                  required
                  value={priority}
                  onChange={handleSetPriority}
                  label="Priority"
                  labelId="add-task-modal-priority"
                  sx={{
                     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: COLORS.main,
                     },
                  }}
               >
                  {priorities.map((priority) => (
                     <MenuItem aria-required key={priority} value={priority}>
                        {priority}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <DatePicker
               value={dueDate}
               onChange={handleDateChange}
               label="Task due date"
               slotProps={{ textField: { required: true } }}
            />

            <SubmitButton
               onClick={handleCardSubmit}
               hasIcon={false}
               text="Add"
               disabled={
                  !cardName.trim() ||
                  !priority ||
                  !dueDate ||
                  !cardDescription.trim()
               }
               disabledText="Please, fill the required* fields"
            />
         </FormControl>
      </Box>
   )
}
