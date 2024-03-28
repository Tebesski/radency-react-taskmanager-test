import { useDispatch, useSelector } from "react-redux"
import { forwardRef, useEffect } from "react"
import { Dialog, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"

import HistoryDialogTitle from "./HistoryDialog/HistoryDialogTitle"
import HistoryDialogContent from "./HistoryDialog/HistoryDialogContent"
import HistoryLogItem from "./HistoryLogItem/HistoryLogItem"

import { RootState } from "../../reducers/root-reducer"
import { fetchLogs } from "../../api/api"
import { setAllLogsLoading, setLogs } from "../../reducers/log.reducer"

type HistoryProps = { isOpen: boolean; onCloseHistory: () => void }

const Transition = forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement<any, any>
   },
   ref: React.Ref<unknown>
) {
   return <Slide direction="left" ref={ref} {...props} />
})

export default function History({ isOpen, onCloseHistory }: HistoryProps) {
   const dispatch = useDispatch()
   const { log } = useSelector((state: RootState) => state.logSlice)

   useEffect(() => {
      async function getLogs() {
         try {
            const logs = await fetchLogs()
            if (logs) {
               dispatch(setAllLogsLoading(true))
               dispatch(setLogs({ log: logs }))
               dispatch(setAllLogsLoading(false))
            }
         } catch (error) {
            console.error(`Failed to fetch logs with getLogs()`, error)
         }
      }
      getLogs()
   }, [])

   return (
      <Dialog
         open={isOpen}
         TransitionComponent={Transition}
         keepMounted
         onClose={onCloseHistory}
         PaperProps={{
            style: {
               marginLeft: "auto",
               marginRight: 0,
               width: "25%",
               minHeight: "100vh",
               borderRadius: 0,
            },
         }}
      >
         <HistoryDialogTitle onCloseHistory={onCloseHistory} />
         <HistoryDialogContent>
            {log.map((logItem) => (
               <HistoryLogItem key={logItem.log_id} logItem={logItem} />
            ))}
         </HistoryDialogContent>
      </Dialog>
   )
}
