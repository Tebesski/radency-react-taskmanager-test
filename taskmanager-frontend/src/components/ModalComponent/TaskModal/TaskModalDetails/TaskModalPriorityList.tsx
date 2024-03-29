import { Box, List, ListItemButton, ListItemText, Popover } from "@mui/material"
import { COLORS } from "../../../../constants/colors"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../reducers/root-reducer"
import { setNewCardPriority } from "../../../../reducers/task-edit.reducer"

type TaskModalPriorityListProps = {
   setEditPriorityMode: (mode: boolean) => void
   editPriorityMode: boolean
}

export default function TaskModalPriorityList({
   setEditPriorityMode,
   editPriorityMode,
}: TaskModalPriorityListProps) {
   const dispatch = useDispatch()

   const allPriorities = ["LOW", "MEDIUM", "HIGH"]
   const { cardPriority } = useSelector((state: RootState) => state.taskEdit)

   const availablePriorities = allPriorities.filter(
      (priority) => priority.toLowerCase() !== cardPriority.toLowerCase()
   )

   function handleSavePriority(value: string) {
      setEditPriorityMode(false)
      dispatch(
         setNewCardPriority(
            value.substring(0, 1).toUpperCase() +
               value.substring(1).toLowerCase()
         )
      )
   }

   return (
      <Popover
         open={editPriorityMode}
         onClose={() => setEditPriorityMode(false)}
         anchorReference="anchorPosition"
         anchorPosition={{ top: 342, left: 388 }}
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
               {availablePriorities.map((item, index) => (
                  <ListItemButton
                     sx={{
                        backgroundColor: "white",
                        height: 30,
                        width: 92,
                        padding: 1,
                        textAlign: "center",
                     }}
                     key={index}
                     onClick={() => handleSavePriority(item)}
                  >
                     <ListItemText primary={item} />
                  </ListItemButton>
               ))}
            </List>
         </Box>
      </Popover>
   )
}
