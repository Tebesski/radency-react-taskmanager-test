import { Box, Typography } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateBack } from "@fortawesome/free-solid-svg-icons"

import Search from "../SearchComponent/Search"
import styles from "./css/task-board.module.css"
import { HistoryButton } from "../UI/HistoryButton"
import AddListButton from "../UI/AddListButton"
import { COLORS } from "../../constants/colors"

type TaskBoardHeaderProps = {
   onOpenHistory: () => void
   onOpenAddList: () => void
   setSearchQuery: (query: string) => void
}

export default function TaskBoardHeader({
   onOpenHistory,
   onOpenAddList,
   setSearchQuery,
}: TaskBoardHeaderProps) {
   return (
      <Box className={styles.header}>
         <Box className={styles.headerButtons}>
            <Typography
               sx={{
                  fontWeight: "bold",
                  color: COLORS.dark,
               }}
               variant="h5"
               className={styles.headerTitle}
            >
               Task Board 3000
            </Typography>

            <Search setSearchQuery={setSearchQuery} />
         </Box>

         <Box className={styles.headerButtons}>
            <HistoryButton
               disableRipple
               size="small"
               variant="outlined"
               onClick={onOpenHistory}
            >
               <FontAwesomeIcon icon={faRotateBack} />
               History
            </HistoryButton>

            <AddListButton onClick={onOpenAddList} />
         </Box>
      </Box>
   )
}
