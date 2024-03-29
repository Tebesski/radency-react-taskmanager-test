import { Box, CircularProgress } from "@mui/material"
import TaskModalDetailsTitle from "./TaskModalDetailsTitle"
import TaskModalDetailsInfo from "./TaskModalDetailsInfo"
import TaskModalDetailsDescription from "./TaskModalDetailsDescription"
import { COLORS } from "../../../../constants/colors"
import TaskCardModel from "../../../../models/TaskCard.model"
import BackdropLoading from "../../../UI/BackdropLoading"
import { useSelector } from "react-redux"
import { RootState } from "../../../../reducers/root-reducer"

export default function TaskModalDetails({ task }: { task: TaskCardModel }) {
   const { taskIsLoading, taskIsEditing } = useSelector(
      (state: RootState) => state.taskSlice
   )
   return (
      <Box
         sx={{
            backgroundColor: COLORS.light,
            flex: 2,
         }}
      >
         {taskIsLoading ? (
            <CircularProgress />
         ) : (
            <TaskModalDetailsTitle task={task} />
         )}

         {taskIsLoading ? <CircularProgress /> : <TaskModalDetailsInfo />}
         {taskIsLoading ? (
            <CircularProgress />
         ) : (
            <TaskModalDetailsDescription />
         )}
         <BackdropLoading isOpen={taskIsLoading! || taskIsEditing!} />
      </Box>
   )
}
