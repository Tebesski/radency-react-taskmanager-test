import { ReactNode } from "react"
import { Paper, Popover } from "@mui/material"
import { COLORS } from "../../constants/colors"

type PopOverProps = {
   handleClose: () => void
   anchorEl: null | HTMLElement
   isOpen: boolean
   children: ReactNode
}

export default function PopOver({
   handleClose,
   anchorEl,
   isOpen,
   children,
}: PopOverProps) {
   const id = isOpen ? "simple-popover" : undefined

   return (
      <Popover
         id={id}
         open={isOpen}
         onClose={handleClose}
         onClick={handleClose}
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
         }}
         transformOrigin={{
            vertical: "top",
            horizontal: "left",
         }}
         sx={{ marginLeft: -1.5 }}
         elevation={0}
      >
         <Paper
            elevation={0}
            sx={{
               width: 175,
               padding: 1,
               border: `1px solid ${COLORS.dark}`,
            }}
         >
            {children}
         </Paper>
      </Popover>
   )
}
