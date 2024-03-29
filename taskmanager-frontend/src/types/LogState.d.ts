import LogModel from "../models/Log.model"

export type LogState = {
   log: LogModel[]
   allLogsLoading?: boolean
   cardLogsLoading?: boolean
}
