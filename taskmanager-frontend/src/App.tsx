import { useEffect, useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import History from "./components/HistoryComponent/History"
import TaskBoard from "./components/TaskBoardComponent/TaskBoard"
import TaskBoardBody from "./components/TaskBoardComponent/TaskBoardBody"
import TaskBoardHeader from "./components/TaskBoardComponent/TaskBoardHeader"
import TaskList from "./components/TaskListComponent/TaskList"
import AddListModal from "./components/ModalComponent/AddListModal/AddListModal"
import { fetchTaskLists, fetchTasks } from "./api/api"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./reducers/root-reducer"
import { setTasks } from "./reducers/tasks.reducer"
import { setTaskList } from "./reducers/task-list.reducer"
import BackdropLoading from "./components/UI/BackdropLoading"

function App() {
   const dispatch = useDispatch()
   const { tasks } = useSelector((state: RootState) => state.taskSlice)
   const { taskList, taskListDeleting } = useSelector(
      (state: RootState) => state.taskListSlice
   )
   const [searchQuery, setSearchQuery] = useState("")

   const [historyModalOpen, setHistoryModalOpen] = useState(false)
   const [addListModalOpen, setAddListModalOpen] = useState(false)

   const handleOpenHistory = () => {
      setHistoryModalOpen(true)
   }

   const handleCloseHistory = () => {
      setHistoryModalOpen(false)
   }

   const handleOpenAddList = () => {
      setAddListModalOpen(true)
   }

   const handleCloseAddList = () => {
      setAddListModalOpen(false)
   }

   useEffect(() => {
      async function getTasks() {
         try {
            const tasks = await fetchTasks()
            if (tasks) dispatch(setTasks({ tasks: tasks, tasksLoading: false }))
         } catch (error) {
            dispatch(setTasks({ tasks: [], tasksLoading: false }))
            console.error(error)
         }
      }
      getTasks()
   }, [])

   useEffect(() => {
      async function getTaskLists() {
         try {
            const taskLists = await fetchTaskLists()
            if (taskLists)
               dispatch(
                  setTaskList({ taskList: taskLists, taskListLoading: false })
               )
         } catch (error) {
            dispatch(setTaskList({ taskList: [], taskListLoading: false }))
            console.error(error)
         }
      }
      getTaskLists()
   }, [])

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <TaskBoard>
            <TaskBoardHeader
               setSearchQuery={setSearchQuery}
               onOpenHistory={handleOpenHistory}
               onOpenAddList={handleOpenAddList}
            />

            <TaskBoardBody>
               {taskList.map((taskList) => {
                  return (
                     <TaskList
                        searchQuery={searchQuery}
                        key={taskList.task_list_id}
                        task_list_name={taskList.task_list_name}
                        task_list_id={taskList.task_list_id}
                        tasks={tasks.filter((task) => {
                           return task.task_list_id === taskList.task_list_id
                        })}
                     />
                  )
               })}
            </TaskBoardBody>

            <History
               onCloseHistory={handleCloseHistory}
               isOpen={historyModalOpen}
            />

            <AddListModal
               isOpen={addListModalOpen}
               onClose={handleCloseAddList}
            />

            <BackdropLoading isOpen={taskListDeleting!} />
         </TaskBoard>
      </LocalizationProvider>
   )
}

export default App
