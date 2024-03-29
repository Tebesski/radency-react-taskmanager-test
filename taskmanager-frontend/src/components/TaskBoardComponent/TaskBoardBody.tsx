import { Box } from "@mui/material"
import styles from "./css/task-board.module.css"

type TaskBoardBodyProps = { children: React.ReactNode }

export default function TaskBoardBody({ children }: TaskBoardBodyProps) {
   return <Box className={styles.body}>{children}</Box>
}
