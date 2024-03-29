import { Box, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../../reducers/root-reducer"
import { setNewCardDescription } from "../../../../reducers/task-edit.reducer"

export default function TaskModalDetailsDescription() {
   const { editingMode, newCardDescription, cardDescription } = useSelector(
      (state: RootState) => state.taskEdit
   )

   const dispatch = useDispatch()

   function handleSetNewCardDescription(
      event: React.ChangeEvent<HTMLInputElement>
   ) {
      dispatch(setNewCardDescription(event.target.value))
   }

   return (
      <Box sx={{ padding: 5, paddingTop: 0 }}>
         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Description
         </Typography>

         {editingMode ? (
            <TextField
               fullWidth
               multiline
               key="editing"
               value={newCardDescription}
               onChange={handleSetNewCardDescription}
               variant="outlined"
               sx={{
                  "& .MuiInputBase-root": {
                     fontSize: 16,
                     fontWeight: 400,
                     borderRadius: 0,
                     padding: 1,
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
            <Typography variant="body1">
               {newCardDescription || cardDescription}
            </Typography>
         )}
      </Box>
   )
}
