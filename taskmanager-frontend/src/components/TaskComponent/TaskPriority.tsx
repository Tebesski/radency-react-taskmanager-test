import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Chip } from "@mui/material"
import { PRIORITY_COLORS } from "../../constants/colors"

export default function TaskPriority({
   taskPriority,
}: {
   taskPriority: string
}) {
   return (
      <Box>
         <Chip
            sx={{
               height: 20,
               display: "flex",
               gap: 1,
               width: 100,
            }}
            label={taskPriority
               .slice(0, 1)
               .toUpperCase()
               .concat(taskPriority.slice(1).toLowerCase())}
            icon={
               <FontAwesomeIcon
                  icon={faCircle}
                  style={{ fontSize: 6 }}
                  color={
                     PRIORITY_COLORS[
                        taskPriority.toLowerCase() as keyof typeof PRIORITY_COLORS
                     ]
                  }
               />
            }
         />
      </Box>
   )
}
