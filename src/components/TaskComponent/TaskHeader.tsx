import { CardHeader, IconButton } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
   faEdit,
   faEllipsisVertical,
   faTrash,
} from "@fortawesome/free-solid-svg-icons"

import { COLORS } from "../../constants/colors"
import PopOver from "../UI/PopOver"
import { useState } from "react"
import PopOverButton from "../UI/PopOverButton"
import dayjs from "dayjs"
import { deleteTaskCard } from "../../api/api"
import { deleteTask, deleteTaskLoading } from "../../reducers/tasks.reducer"
import { useDispatch } from "react-redux"

type TaskHeaderProps = {
   onOpenTaskModal: () => void
   taskName: string
   taskId: string
   taskCreationTime: string
}

export default function TaskHeader({
   onOpenTaskModal,
   taskName,
   taskId,
   taskCreationTime,
}: TaskHeaderProps) {
   const dispatch = useDispatch()
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
   const [popOverIsOpen, setPopOverIsOpen] = useState(false)

   function handleOpenPopOver(event: React.MouseEvent<HTMLButtonElement>) {
      setAnchorEl(event.currentTarget)
      setPopOverIsOpen(true)
   }

   function handleClosePopOver() {
      setAnchorEl(null)
      setPopOverIsOpen(false)
   }

   async function handleDeleteTask() {
      dispatch(deleteTask(taskId))

      dispatch(deleteTaskLoading(true))
      await deleteTaskCard(taskId)
      dispatch(deleteTaskLoading(false))
      handleClosePopOver()
   }

   return (
      <CardHeader
         sx={{ marginBottom: -3 }}
         titleTypographyProps={{ variant: "button" }}
         subheaderTypographyProps={{ variant: "caption" }}
         title={taskName}
         subheader={`created on: ${dayjs(taskCreationTime).format(
            "MMM D, h:mm A"
         )}`}
         action={
            <>
               <IconButton
                  aria-label="settings"
                  disableRipple
                  sx={{
                     "&:hover": { color: COLORS.dark },
                  }}
                  onClick={handleOpenPopOver}
               >
                  <FontAwesomeIcon size="xs" icon={faEllipsisVertical} />
               </IconButton>

               <PopOver
                  anchorEl={anchorEl}
                  handleClose={handleClosePopOver}
                  isOpen={popOverIsOpen}
               >
                  <PopOverButton
                     text="Edit"
                     icon={faEdit}
                     color="darkslategray"
                     onClick={onOpenTaskModal}
                  />
                  <PopOverButton
                     onClick={handleDeleteTask}
                     text="Delete"
                     icon={faTrash}
                     color="red"
                  />
               </PopOver>
            </>
         }
      />
   )
}
