import { Alert, Box, FormControl, Input } from "@mui/material"
import { COLORS } from "../../../constants/colors"
import SubmitButton from "../../UI/SubmitButton"

type AddListModalFormProps = {
   handleListSubmit: () => void
   error: boolean
   listName: string
   setListName: (name: string) => void
}

export default function AddListModalForm({
   handleListSubmit,
   error,
   listName,
   setListName,
}: AddListModalFormProps) {
   return (
      <Box>
         <FormControl sx={{ padding: 3, paddingTop: 2, gap: 3 }}>
            <Input
               inputProps={{ maxLength: 24 }}
               placeholder="Enter task list name..."
               value={listName}
               onChange={(e) => setListName(e.target.value)}
               sx={{
                  "&:before": {
                     borderBottomColor: COLORS.main,
                  },
                  "&:hover:not(.Mui-disabled):before": {
                     borderBottomColor: COLORS.main,
                  },
                  "&:after": {
                     borderBottomColor: COLORS.main,
                  },
               }}
            />

            <Alert severity="error" sx={{ display: error ? "flex" : "none" }}>
               Failed to add new task list
            </Alert>

            <SubmitButton
               onClick={() => handleListSubmit()}
               hasIcon={false}
               text="Add"
               disabled={!listName.trim()}
               disabledText="Please, enter a list name"
            />
         </FormControl>
      </Box>
   )
}
