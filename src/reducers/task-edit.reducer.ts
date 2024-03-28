import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaskDetailsModel } from "../types/TaskDetailsModel"

const initialState: TaskEditState = {
   editingMode: false,
   cardName: "",
   cardDescription: "",
   cardDueDate: "",
   cardStatusName: "",
   cardStatusId: "",
   cardPriority: "",
   newCardName: "",
   newCardDescription: "",
   newCardDueDate: "",
   newCardStatusName: "",
   newCardStatusId: "",
   newCardPriority: "",
   editStatusMode: false,
   editDueDateMode: false,
   editPriorityMode: false,
}

const taskModalDetailsSlice = createSlice({
   name: "taskEditReducer",
   initialState,
   reducers: {
      setEditingMode(state, action: PayloadAction<boolean>) {
         state.editingMode = action.payload
      },

      setCardDetails(state, action: PayloadAction<TaskDetailsModel>) {
         state.cardName = action.payload.task_name
         state.cardDescription = action.payload.task_description
         state.cardDueDate = action.payload.task_due_date
         state.cardStatusName = action.payload.task_list_name
         state.cardStatusId = action.payload.task_list_id
         state.cardPriority = action.payload.task_priority
      },

      setCardDueDate(state, action: PayloadAction<string>) {
         state.cardDueDate = action.payload
      },

      setNewCardName(state, action: PayloadAction<string>) {
         state.newCardName = action.payload
      },

      setNewCardDescription(state, action: PayloadAction<string>) {
         state.newCardDescription = action.payload
      },

      setNewCardDueDate(state, action: PayloadAction<string>) {
         state.newCardDueDate = action.payload
      },

      setNewCardStatusName(state, action: PayloadAction<string>) {
         state.newCardStatusName = action.payload
      },

      setNewCardStatusId(state, action: PayloadAction<string>) {
         state.newCardStatusId = action.payload
      },

      setNewCardPriority(state, action: PayloadAction<string>) {
         state.newCardPriority = action.payload
      },

      setEditStatusMode(state, action: PayloadAction<boolean>) {
         state.editStatusMode = !action.payload
      },

      setEditDueDateMode(state, action: PayloadAction<boolean>) {
         state.editDueDateMode = !action.payload
      },

      setEditPriorityMode(state, action: PayloadAction<boolean>) {
         state.editPriorityMode = !action.payload
      },
   },
})

export const {
   setEditingMode,
   setEditStatusMode,
   setEditDueDateMode,
   setEditPriorityMode,
   setCardDetails,
   setNewCardName,
   setNewCardDescription,
   setNewCardDueDate,
   setNewCardStatusName,
   setNewCardStatusId,
   setNewCardPriority,
   setCardDueDate,
} = taskModalDetailsSlice.actions

export default taskModalDetailsSlice.reducer
