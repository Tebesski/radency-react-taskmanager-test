import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, ListItem, Typography } from "@mui/material"
import LogModel from "../../../../models/Log.model"
import dayjs from "dayjs"
import { COLORS } from "../../../../constants/colors"
import TaskListModel from "../../../../models/TaskList.model"
import { useSelector } from "react-redux"
import { RootState } from "../../../../reducers/root-reducer"

export default function TaskModalLog({ logItem }: { logItem: LogModel }) {
   const { log_action, log_date, new_value, old_value } = logItem
   const { taskList } = useSelector((state: RootState) => state.taskListSlice)

   const oldList: TaskListModel | undefined = taskList.find(
      (list) => list.task_list_id === old_value
   )
   const newList: TaskListModel | undefined = taskList.find(
      (list) => list.task_list_id === new_value
   )

   const actionTexts: Record<string, string> = {
      CREATE: "created this task",
      DELETE: "deleted this task",
      RENAME: "renamed this task ",
      UPD_PRIORITY: " updated the priority of this task ",
      UPD_DESCRIPTION: "updated the description of this task ",
      UPD_DUE_DATE: "updated the due date of this task ",
      MOVE: "moved this task ",
   }

   const additionalTexts: Record<string, string> = {
      RENAME: `from ${String(old_value)} to ${String(new_value)}`,
      UPD_PRIORITY: `from ${old_value} to ${
         new_value.charAt(0).toUpperCase() + new_value.slice(1).toLowerCase()
      }`,
      UPD_DESCRIPTION: `from ${old_value} to ${new_value}`,
      UPD_DUE_DATE: `from ${old_value} to ${new_value}`,
      MOVE: `from 🗎 ${oldList?.task_list_name} to 🗎 ${newList?.task_list_name}`,
   }

   const logMessage = {
      actionText: `You ${
         actionTexts[log_action] || "performed unknown action on this task"
      }`,
      additionalText: additionalTexts[log_action] || "",
   }

   const textStyles = {
      actionText: { color: COLORS.dark, fontWeight: 600 },
      additionalText: {
         color: COLORS.dark,
         fontStyle: "italic",
      },
   }

   return (
      <ListItem
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
         }}
      >
         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FontAwesomeIcon
               style={{ fontSize: 5, alignSelf: "flex-start", marginTop: 9 }}
               icon={faCircle}
            />

            <Typography variant="body2">
               <span style={textStyles.actionText}>
                  {logMessage.actionText}
               </span>
               <span style={textStyles.additionalText}>
                  {logMessage.additionalText}
               </span>
            </Typography>
         </Box>
         <Typography sx={{ marginLeft: 2, color: "gray" }} variant="caption">
            {dayjs(log_date).format("MMM D, h:mm A")}
         </Typography>
      </ListItem>
   )
}
