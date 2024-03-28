import { Box, List, ListItemButton, ListItemText, Popover } from "@mui/material"
import { COLORS } from "../../../../constants/colors"
import { useDispatch, useSelector } from "react-redux"
import {
   setNewCardStatusName,
   setNewCardStatusId,
} from "../../../../reducers/task-edit.reducer"
import { RootState } from "../../../../reducers/root-reducer"

type TaskModalStatusListProps = {
   setEditStatusMode: (mode: boolean) => void
   editStatusMode: boolean
}

export default function TaskModalStatusList({
   setEditStatusMode,
   editStatusMode,
}: TaskModalStatusListProps) {
   const dispatch = useDispatch()

   const { taskList } = useSelector((state: RootState) => state.taskListSlice)

   function handleSaveStatus(value: string) {
      const taskName = taskList.find(
         (task) => task.task_list_id === value
      )?.task_list_name

      if (taskName) {
         setEditStatusMode(false)
         dispatch(setNewCardStatusName(taskName))
         dispatch(setNewCardStatusId(value))
      }
   }

   return (
      <Popover
         open={editStatusMode}
         onClose={() => setEditStatusMode(false)}
         anchorReference="anchorPosition"
         anchorPosition={{ top: 235, left: 620 }}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
         }}
         transformOrigin={{
            vertical: "top",
            horizontal: "center",
         }}
         sx={{
            heigh: 106,
            maxHeight: 138,
            borderRadius: 3,
         }}
      >
         <Box
            sx={{
               overflowY: "auto",
               "&::-webkit-scrollbar": {
                  display: "none",
               },
               msOverflowStyle: "none",
               scrollbarWidth: "none",
            }}
         >
            <List
               sx={{
                  padding: 0,
                  backgroundColor: COLORS.light,
               }}
            >
               {taskList.map((item, index) => (
                  <ListItemButton
                     sx={{ backgroundColor: "white", height: 30 }}
                     key={index}
                     onClick={() => handleSaveStatus(item.task_list_id)}
                  >
                     <ListItemText
                        primary={
                           item.task_list_name.length > 15
                              ? item.task_list_name.substring(0, 15) + "..."
                              : item.task_list_name
                        }
                     />
                  </ListItemButton>
               ))}
            </List>
         </Box>
      </Popover>
   )
}
