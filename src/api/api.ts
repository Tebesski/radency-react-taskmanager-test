import axios, { AxiosError, AxiosResponse } from "axios"
import TaskCardModel from "../models/TaskCard.model"
import client from "./axios"
import TaskListModel from "../models/TaskList.model"
import LogModel from "../models/Log.model"

/* ---------------------------------- GET --------------------------------- */

export async function fetchTasks() {
   const res: AxiosResponse | void = await client
      .get("/tasks")
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel[] = res.data
      return data
   }
}

export async function fetchTaskByTaskId(task_id: string) {
   const res: AxiosResponse | void = await client
      .get(`/tasks/${task_id}`)
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

export async function fetchTaskLists() {
   const res: AxiosResponse | void = await client
      .get("/task-list")
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskListModel[] = res.data
      return data
   }
}

export async function fetchLogs() {
   const res: AxiosResponse | void = await client
      .get("/log")
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: LogModel[] = res.data
      return data
   }
}

export async function fetchLogByTaskId(task_id: string) {
   const res: AxiosResponse | void = await client
      .get(`/log/${task_id}`)
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: LogModel[] = res.data
      return data
   }
}

/* ---------------------------------- POST --------------------------------- */

export async function createTaskList(task_list_name: string) {
   const res: AxiosResponse | void = await client
      .post("/task-list", { task_list_name })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskListModel = res.data
      return data
   }
}

export async function createTaskCard(taskCard: TaskCardModel) {
   const res: AxiosResponse | void = await client
      .post("/tasks", taskCard)
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

/* --------------------------------- DELETE --------------------------------- */

export async function deleteTaskList(task_list_id: string) {
   const res: AxiosResponse | void = await client
      .delete(`/task-list/${task_list_id}`)
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskListModel = res.data
      return data
   }
}

export async function deleteTaskCard(task_id: string) {
   const res: AxiosResponse | void = await client
      .delete(`/tasks/${task_id}`)
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

/* ---------------------------------- PATCH --------------------------------- */

export async function updateTaskListName(
   task_list_id: string,
   task_list_name: string
) {
   if (task_list_name.length > 24) {
      return console.error("Task list name must be less than 25 characters")
   }
   const res: AxiosResponse | void = await client
      .patch(`/task-list/${task_list_id}/task_list_name`, { task_list_name })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskListModel = res.data
      return data
   }
}

export async function moveTaskCard(task_id: string, task_list_id: string) {
   const res: AxiosResponse | void = await client
      .patch(`/tasks/${task_id}/task_list_id`, { task_list_id })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

export async function updateTaskCardName(task_id: string, task_name: string) {
   if (task_name.length > 24) {
      return console.error("Task name must be less than 25 characters")
   }
   const res: AxiosResponse | void = await client
      .patch(`/tasks/${task_id}/task_name`, { task_name })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

export async function updateTaskCardDescription(
   task_id: string,
   task_description: string
) {
   const res: AxiosResponse | void = await client
      .patch(`/tasks/${task_id}/task_description`, { task_description })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

export async function updateTaskCardDueDate(
   task_id: string,
   task_due_date: string
) {
   const res: AxiosResponse | void = await client
      .patch(`/tasks/${task_id}/task_due_date`, { task_due_date })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}

export async function updateTaskCardPriority(
   task_id: string,
   task_priority: string
) {
   const res: AxiosResponse | void = await client
      .patch(`/tasks/${task_id}/task_priority`, { task_priority })
      .catch((error: Error | AxiosError) => {
         if (axios.isAxiosError(error)) {
            console.log(error.response?.data)
            console.log(error.response?.status)
            console.log(error.response?.headers)
         } else {
            console.log(error.message)
         }
      })

   if (res) {
      const data: TaskCardModel = res.data
      return data
   }
}
