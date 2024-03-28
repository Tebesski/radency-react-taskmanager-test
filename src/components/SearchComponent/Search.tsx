import { InputAdornment, TextField } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

import { COLORS } from "../../constants/colors"
import styles from "../TaskBoardComponent/css/task-board.module.css"

export default function Search({
   setSearchQuery,
}: {
   setSearchQuery: (query: string) => void
}) {
   return (
      <div className={styles.search}>
         <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            label="Find task"
            id="find-task"
            size="small"
            sx={{
               "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                     borderColor: COLORS.dark,
                  },
               },
               "& .MuiFormLabel-root": {
                  "&.Mui-focused": {
                     color: COLORS.dark,
                  },
               },
            }}
            InputProps={{
               startAdornment: (
                  <InputAdornment position="start">
                     <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </InputAdornment>
               ),
            }}
         />
      </div>
   )
}
