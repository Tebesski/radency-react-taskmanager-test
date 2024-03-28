import { Dialog } from "@mui/material"
import AddTaskModalTitle from "./AddTaskModalTitle"
import AddTaskModalForm from "./AddTaskModalForm"
import BackdropLoading from "../../UI/BackdropLoading"
import { RootState } from "../../../reducers/root-reducer"
import { useSelector } from "react-redux"

type AddListModalProps = {
   isOpen: boolean
   onClose: () => void
   taskListId: string
}

export default function AddTaskModal({
   isOpen,
   onClose,
   taskListId,
}: AddListModalProps) {
   const { addTaskLoading } = useSelector((state: RootState) => state.taskSlice)

   return (
      <Dialog open={isOpen} onClose={onClose}>
         <AddTaskModalTitle onClose={onClose} />
         <AddTaskModalForm taskListId={taskListId} onClose={onClose} />
         <BackdropLoading isOpen={addTaskLoading!} />
      </Dialog>
   )
}
