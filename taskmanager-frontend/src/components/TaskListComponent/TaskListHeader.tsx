import { Box, IconButton, TextField, Typography } from "@mui/material"
import { COLORS } from "../../constants/colors"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
   faCheck,
   faEdit,
   faEllipsisVertical,
   faPlus,
   faTrash,
   faXmark,
} from "@fortawesome/free-solid-svg-icons"
import PopOver from "../UI/PopOver"
import { createRef, useEffect, useState } from "react"
import PopOverButton from "../UI/PopOverButton"
import { deleteTaskList, updateTaskListName } from "../../api/api"
import { useDispatch } from "react-redux"
import {
   deleteList,
   renameTaskList,
   setTaskListDeleting,
} from "../../reducers/task-list.reducer"

type TaskListHeaderProps = {
   onAddTask: () => void
   taskListName: string
   taskListCardsAmount: number
   taskListId: string
}

export default function TaskListHeader({
   onAddTask,
   taskListName,
   taskListCardsAmount,
   taskListId,
}: TaskListHeaderProps) {
   const dispatch = useDispatch()

   /* ---------------------------- POP OVER SETUP --------------------------- */
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

   /* -------------------------------- HANDLERS SETUP -------------------------------- */
   const [editingMode, setEditingMode] = useState<boolean>(false)
   const [listName, setListName] = useState<string>(taskListName)
   const [newListName, setNewListName] = useState<string>("")
   const inputRef = createRef<HTMLInputElement>()

   function handleEditList() {
      setEditingMode(true)
      setNewListName(listName)
      inputRef.current?.focus()
   }

   async function handleSubmitListName() {
      if (!newListName.trim()) {
         setEditingMode(false)
         return
      }
      setListName(newListName)
      await updateTaskListName(taskListId, newListName)
      dispatch(
         renameTaskList({
            task_list_id: taskListId,
            task_list_name: newListName,
         })
      )
      setEditingMode(false)
   }

   function handleCancelEdit() {
      setEditingMode(false)
   }

   async function handleDeleteList() {
      try {
         dispatch(setTaskListDeleting(true))
         const deleted = await deleteTaskList(taskListId)

         if (deleted) {
            dispatch(deleteList(taskListId))
            dispatch(setTaskListDeleting(false))
            console.log(`Task list with id ${taskListId} has been deleted`)
         }
      } catch (error) {
         console.error(
            `Failed to delete task list with handleDeleteList() in TaskListHeader.tsx`,
            error
         )
      }
   }

   function handleAddCard() {
      onAddTask()
   }

   useEffect(() => {
      if (editingMode) {
         inputRef.current?.focus()
      }
   }, [editingMode])

   const Name = editingMode ? (
      <Box sx={{ display: "flex" }}>
         <TextField
            key="editing"
            inputRef={inputRef}
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            variant="filled"
            sx={{
               input: {
                  padding: 1,
               },
               "& .MuiInputBase-root": {
                  fontSize: 14,
                  borderRadius: 0,
               },
               "& .MuiFilledInput-underline:before": {
                  display: "none",
               },
               "& .MuiFilledInput-underline:after": {
                  display: "none",
               },
            }}
         />

         <IconButton disableRipple onClick={handleSubmitListName}>
            <FontAwesomeIcon color="green" icon={faCheck} size="xs" />
         </IconButton>
         <IconButton disableRipple onClick={handleCancelEdit}>
            <FontAwesomeIcon color="red" icon={faXmark} size="xs" />
         </IconButton>
      </Box>
   ) : (
      <Typography key="viewing" variant="subtitle2" color={COLORS.dark}>
         {listName}
      </Typography>
   )

   return (
      <Box
         sx={{
            backgroundColor: "transparent",
            borderBottom: `2px solid rgba(34, 34, 32, 0.2)`,
            borderTop: `2px solid rgba(34, 34, 32, 0.2)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "5px",
            paddingBottom: "5px",
         }}
      >
         {/* ----------------------------- LIST NAME ----------------------------- */}
         {Name}

         {/* ----------------------------- LIST OPTIONS ----------------------------- */}
         {editingMode ? null : (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
               <Typography variant="subtitle2" color={COLORS.dark}>
                  {taskListCardsAmount}
               </Typography>

               <IconButton
                  aria-label="settings"
                  disableRipple
                  sx={{
                     "&:hover": { color: COLORS.dark },
                     "&:focus": { color: COLORS.dark },
                  }}
                  onClick={handleOpenPopOver}
               >
                  <FontAwesomeIcon
                     style={{ marginBottom: 2 }}
                     size="xs"
                     icon={faEllipsisVertical}
                  />
               </IconButton>

               {/* ----------------------------- OPTIONS POP OVER ----------------------------- */}

               <PopOver
                  anchorEl={anchorEl}
                  isOpen={popOverIsOpen}
                  handleClose={handleClosePopOver}
               >
                  <PopOverButton
                     onClick={handleEditList}
                     text="Edit"
                     icon={faEdit}
                     color="darkslategray"
                  />
                  <PopOverButton
                     onClick={handleAddCard}
                     text="Add new card"
                     icon={faPlus}
                     color="darkslategray"
                  />
                  <PopOverButton
                     onClick={handleDeleteList}
                     text="Delete"
                     icon={faTrash}
                     color="red"
                  />
               </PopOver>
            </Box>
         )}
      </Box>
   )
}
