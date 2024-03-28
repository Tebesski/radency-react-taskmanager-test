import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Typography } from "@mui/material"
import EditButton from "../../../UI/EditButton"
import dayjs from "dayjs"

type TaskModalInfoItemProps = {
   icon: IconProp
   infoType: string
   info: string
   editingMode: boolean
   handleEdit: () => void
   dueDate?: boolean
   taskDueDate?: string
}

export default function TaskModalInfoItem({
   icon,
   infoType,
   info,
   editingMode,
   handleEdit,
   dueDate,
}: TaskModalInfoItemProps) {
   const viewMode = (
      <Typography sx={{ width: "75%", fontWeight: "bold", marginRight: 6 }}>
         {dueDate ? dayjs(info).format("ddd, D MMMM") : info}
      </Typography>
   )

   const editMode = (
      <Box sx={{ width: "75%", fontWeight: "bold", marginRight: 6 }}>
         <EditButton
            dueDate={dueDate}
            text={dueDate ? dayjs(info).format("ddd, D MMMM") : info}
            onClick={handleEdit}
         />
      </Box>
   )
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
         }}
      >
         <Box
            sx={{
               display: "flex",
               flexDirection: "row",
               gap: 2,
               alignItems: "center",
            }}
         >
            <FontAwesomeIcon icon={icon} />
            <Typography>{infoType}</Typography>
         </Box>

         {editingMode ? editMode : viewMode}
      </Box>
   )
}
