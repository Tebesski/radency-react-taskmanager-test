import { DialogContent, List } from "@mui/material"
import { COLORS } from "../../../constants/colors"
import { ReactNode } from "react"

type HistoryDialogContentProps = { children: ReactNode }

export default function HistoryDialogContent({
   children,
}: HistoryDialogContentProps) {
   return (
      <DialogContent sx={{ backgroundColor: COLORS.light }}>
         <List
            sx={{
               display: "flex",
               flexDirection: "column",
               gap: 2,
               paddingTop: 3,
            }}
         >
            {children}
         </List>
      </DialogContent>
   )
}
