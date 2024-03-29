import { faCalendar } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Typography } from "@mui/material"

import { COLORS } from "../../constants/colors"
import dayjs from "dayjs"

export default function TaskDueDate({ taskDueDate }: { taskDueDate: string }) {
   return (
      <Box display="flex" gap="5px">
         <FontAwesomeIcon icon={faCalendar} color={COLORS.dark} />

         <Typography color={COLORS.dark} variant="subtitle2">
            {dayjs(taskDueDate).format("ddd, DD MMM")}
         </Typography>
      </Box>
   )
}
