import { Box, Typography } from "@mui/material"

export default function TaskDescription({
   taskDescription,
}: {
   taskDescription: string
}) {
   return (
      <Box>
         <Typography variant="body2">
            {taskDescription.length > 120
               ? taskDescription.substring(0, 100) + "..."
               : taskDescription}
         </Typography>
      </Box>
   )
}
