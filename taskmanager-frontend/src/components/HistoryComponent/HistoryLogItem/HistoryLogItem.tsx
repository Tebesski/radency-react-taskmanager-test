import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, ListItem, Typography } from "@mui/material"
import LogModel from "../../../models/Log.model"
import { useSelector } from "react-redux"
import { RootState } from "../../../reducers/root-reducer"
import TaskCardModel from "../../../models/TaskCard.model"
import TaskListModel from "../../../models/TaskList.model"
import dayjs from "dayjs"
import { COLORS } from "../../../constants/colors"

export default function HistoryLogItem({ logItem }: { logItem: LogModel }) {
   const { taskList } = useSelector((state: RootState) => state.taskListSlice)
   const { tasks } = useSelector((state: RootState) => state.taskSlice)

   const {
      entity_field,
      entity_id,
      entity_type,
      log_action,
      log_date,
      new_value,
      old_value,
   } = logItem

   const oldList: TaskListModel | undefined = taskList.find(
      (list) => list.task_list_id === old_value
   )
   const newList: TaskListModel | undefined = taskList.find(
      (list) => list.task_list_id === new_value
   )

   function getField(field: string) {
      if (!field) {
         return ""
      }
      return field.replace(/^(task_|task_list_)/, " ").replace(/_/g, " ")
   }

   const actionTexts: Record<string, string> = {
      CREATE: "created ",
      DELETE: "deleted ",
      RENAME: "renamed ",
      UPDATE: "renamed ",
      UPD_PRIORITY: "updated ",
      UPD_DESCRIPTION: "updated ",
      UPD_DUE_DATE: "updated ",
      MOVE: "moved ",
   }

   const additionalTexts: Record<string, string> = {
      RENAME: ` to ${new_value}`,

      UPDATE: ` to ${new_value}`,

      UPD_PRIORITY: `${getField(entity_field)} from ${old_value} to ${
         ["MEDIUM", "HIGH", "LOW"].includes(new_value)
            ? new_value.charAt(0).toUpperCase() +
              new_value.slice(1).toLowerCase()
            : new_value
      }`,

      UPD_DESCRIPTION: `${getField(
         entity_field
      )} from ${old_value} to ${new_value}`,

      UPD_DUE_DATE: `${getField(
         entity_field
      )} from ${old_value} to ${new_value}`,

      MOVE: ` from 🗎 ${oldList?.task_list_name} to 🗎 ${newList?.task_list_name}`,
   }

   const getEntityNameText = (type: string, id: string) => {
      if (type === "Task") {
         const task: TaskCardModel | undefined = tasks.find(
            (task) => task.task_id === id
         )
         return "◎ " + (old_value || new_value || task?.task_name)
      } else if (type === "Task list") {
         const list: TaskListModel | undefined = taskList.find(
            (list) => list.task_list_id === id
         )
         return "🗎 " + (old_value || list?.task_list_name || new_value)
      } else {
         return "_"
      }
   }

   const logMessage = {
      actionText: `You ${
         actionTexts[log_action] || "performed unknown action on"
      }`,
      entityNameText: getEntityNameText(entity_type, entity_id),
      additionalText: additionalTexts[log_action] || "",
   }

   const textStyles = {
      actionText: { color: COLORS.darkSoft },
      entityNameText: { color: COLORS.dark, fontWeight: 600 },
      additionalText: {
         color: COLORS.darkSoft,
         fontStyle: "italic",
         fontWeight: 500,
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
               <span style={textStyles.entityNameText}>
                  {logMessage.entityNameText}
               </span>
               <span style={textStyles.additionalText}>
                  {logMessage.additionalText}
               </span>
            </Typography>
         </Box>
         <Typography
            sx={{ marginLeft: 2, color: "gray", opacity: 0.8 }}
            variant="caption"
         >
            {dayjs(log_date).format("MMM D, h:mm A")}
         </Typography>
      </ListItem>
   )
}
