import { ReactNode } from "react"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import { Box } from "@mui/material"

import styles from "./css/task-board.module.css"

type TaskBoardProps = {
   children: ReactNode
}

export default function TaskBoard({ children }: TaskBoardProps) {
   return (
      <Box className={styles.container}>
         <Grid2
            container
            sx={{
               margin: "0 auto",
               justifyContent: "center",
               alignItems: "center",
               width: "75%",
               gap: 2,
            }}
         >
            {children}
         </Grid2>
      </Box>
   )
}
