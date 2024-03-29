import { Dialog } from "@mui/material"
import AddListModalForm from "./AddListModalForm"
import AddListModalTitle from "./AddListModalTitle"
import { useDispatch, useSelector } from "react-redux"
import { createTaskList } from "../../../api/api"
import { useState } from "react"
import {
   addNewTask,
   setTaskListAdding,
} from "../../../reducers/task-list.reducer"
import BackdropLoading from "../../UI/BackdropLoading"
import { RootState } from "../../../reducers/root-reducer"

type AddListModalProps = { isOpen: boolean; onClose: () => void }

export default function AddListModal({ isOpen, onClose }: AddListModalProps) {
   const { taskListAdding } = useSelector(
      (state: RootState) => state.taskListSlice
   )
   const [listName, setListName] = useState<string>("")
   const [error, setError] = useState(false)

   const dispatch = useDispatch()

   async function handleListSubmit() {
      const trimmed = listName.trim()
      try {
         if (trimmed) {
            dispatch(setTaskListAdding(true))
            const list = await createTaskList(trimmed)

            if (!list) {
               setError(true)
               setTimeout(() => setError(false), 3000)
               return
            }
            dispatch(setTaskListAdding(false))
            setListName("")
            onClose()
            dispatch(addNewTask(list!))
         }
      } catch (error) {
         setError(true)
         setTimeout(() => setError(false), 3000)
         console.error(
            `Failed to add new task list with handleListSubmit() in AddListModalForm.tsx`,
            error
         )
      }
   }

   return (
      <Dialog open={isOpen} onClose={onClose}>
         <AddListModalTitle onClose={onClose} />
         <AddListModalForm
            handleListSubmit={handleListSubmit}
            error={error}
            listName={listName}
            setListName={setListName}
         />
         <BackdropLoading isOpen={taskListAdding!} />
      </Dialog>
   )
}
