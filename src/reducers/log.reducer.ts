import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { LogState } from "../types/LogState"
import LogModel from "../models/Log.model"

const initialState: LogState = {
   log: [],
   allLogsLoading: false,
   cardLogsLoading: false,
}

const logSlice = createSlice({
   name: "logReducer",
   initialState,
   reducers: {
      setLogs(state, action: PayloadAction<LogState>) {
         state.log = action.payload.log
      },

      addLog(state, action: PayloadAction<LogModel>) {
         state.log = [action.payload, ...state.log]
      },

      setAllLogsLoading(state, action: PayloadAction<boolean>) {
         state.allLogsLoading = action.payload
      },

      setCardLogsLoading(state, action: PayloadAction<boolean>) {
         state.cardLogsLoading = action.payload
      },
   },
})

export const { setLogs, setAllLogsLoading, setCardLogsLoading, addLog } =
   logSlice.actions

export default logSlice.reducer
