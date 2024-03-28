import { Box, CircularProgress, List, Typography } from "@mui/material"
import { COLORS } from "../../../../constants/colors"
import { useSelector } from "react-redux"
import { RootState } from "../../../../reducers/root-reducer"

type TaskModalActivityProps = { children: React.ReactNode; isOpen: boolean }

export default function TaskModalActivity({
   children,
}: TaskModalActivityProps) {
   const { cardLogsLoading } = useSelector((state: RootState) => state.logSlice)

   return (
      <Box
         sx={{
            flex: 1,
            backgroundColor: COLORS.ligth_secondary,
            overflow: "auto",
         }}
      >
         <Typography
            variant="h6"
            sx={{ fontWeight: 600, padding: 3.5, paddingBottom: 0 }}
         >
            Activity
         </Typography>
         <List
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 2,
               paddingTop: 3,
            }}
         >
            {cardLogsLoading ? (
               <CircularProgress
                  sx={{ alignSelf: "center", justifySelf: "center" }}
                  color="success"
               />
            ) : (
               children
            )}
         </List>
      </Box>
   )
}
